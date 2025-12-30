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
import { Label } from "@/components/ui/label";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AuthTypes } from "../types";
import { useForm } from "react-hook-form";
import z from "zod";
import { signUpFormSchema } from "../schema";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { GoAlert } from "react-icons/go";
interface SignUpCardProps {
  setAuthState: (authState: AuthTypes) => void;
}
export const SingUpCard = ({ setAuthState }: SignUpCardProps) => {
   const { signIn } = useAuthActions();
  const [isPending,setIsPending] = useState(false);
    const[error, setError] = useState("")
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver:zodResolver(signUpFormSchema)
  });
  const handleSignUpFormSubmit = (values: z.infer<typeof signUpFormSchema>) => {
     setIsPending(true);
   signIn("password",{
      name:values.name,
      email:values.email,
      password:values.password,
      flow:"signUp"
    }).catch(() =>{
      setError("Something went wrong")
    }).finally(()=>{
 setIsPending(false)
    })
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-semibold">Create new account!</CardTitle>
        <CardDescription>
          Enter your details below to register to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => setAuthState("signIn")}>
            Sign In
          </Button>
        </CardAction>
      </CardHeader>
      {!!error && (
              <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm">
                 <GoAlert className="size-5"/>
                 <p>{error}</p>
              </div>
            )}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUpFormSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} placeholder="enter name" {...field} />
                      </FormControl>
                      <FormMessage  />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input  disabled={isPending} placeholder="enter email" {...field} />
                      </FormControl>
                      <FormMessage  />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
               <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input  disabled={isPending} type="password" placeholder="enter password" {...field} />
                      </FormControl>
                      <FormMessage  />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Button type="submit" className="w-full"  disabled={isPending}>
                  Register
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full"  disabled={isPending}>
          <FcGoogle />
          Login with Google
        </Button>
        <Button variant="outline" className="w-full"  disabled={isPending}>
          <BsGithub />
          Login with Github
        </Button>
      </CardFooter>
    </Card>
  );
};
