import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthActions } from "@convex-dev/auth/react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AuthTypes } from "../types";
import { useForm } from "react-hook-form";
import z from "zod";
import { signInFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoAlert } from "react-icons/go";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

interface SignInCardProps {
  setAuthState: (authState: AuthTypes) => void;
}
export const SignInCard = ({ setAuthState }: SignInCardProps) => {
  const { signIn } = useAuthActions();
  const [isPending,setIsPending] = useState(false);
  const[error, setError] = useState("")
  const handleProviderSignIn = (value: "github" | "google") =>{
    setIsPending(true)
    signIn(value).finally(() =>{
      setIsPending(false)
    })
  }
  const form = useForm<z.infer<typeof signInFormSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInFormSchema),
  });

  const handleSignInForm = (values:z.infer<typeof signInFormSchema>) => {
     setIsPending(true);
   signIn("password",{
      email:values.email,
      password:values.password,
      flow:"signIn"
    }).catch(() =>{
      setError("Invalid Email or Password")
    }).finally(()=>{
 setIsPending(false)
    })
   
    
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => setAuthState("signUp")}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm">
           <GoAlert/>
           <p>{error}</p>
        </div>
      )}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignInForm)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  Login
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full" disabled={isPending}>
          <FcGoogle />
          Login with Google
        </Button>
        <Button variant="outline" className="w-full" onClick={() =>handleProviderSignIn("github")} disabled={isPending}>
          <BsGithub />
          Login with Github
        </Button>
      </CardFooter>
    </Card>
  );
};
