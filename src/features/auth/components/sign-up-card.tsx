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
interface SignUpCardProps {
  setAuthState: (authState: AuthTypes) => void;
}
export const SingUpCard = ({ setAuthState }: SignUpCardProps) => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver:zodResolver(signUpFormSchema)
  });
  const handleSignUpFormSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    console.log("values====>", values);
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
                        <Input placeholder="enter name" {...field} />
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
                        <Input placeholder="enter email" {...field} />
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
                        <Input type="password" placeholder="enter password" {...field} />
                      </FormControl>
                      <FormMessage  />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          <FcGoogle />
          Login with Google
        </Button>
        <Button variant="outline" className="w-full">
          <BsGithub />
          Login with Github
        </Button>
      </CardFooter>
    </Card>
  );
};
