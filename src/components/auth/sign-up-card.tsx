"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { LOGO_URL } from "@/utils/constants";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import registerSchema, { TRegister } from "@/schemas/register-schema";
import { useRegister } from "@/hooks/user-register";

const SignUpCard = () => {
  const { mutate: registerUser, isPending } = useRegister();

  const form = useForm<TRegister>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (values: TRegister) => {
    registerUser(values);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-2 shadow-none">
      <CardHeader className="flex items-center justify-center">
        <Image src={LOGO_URL} height={56} width={56} alt="Logo" />
        <CardTitle className="text-2xl font-semibold ">HashCode</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Full name"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter user name"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter Email Address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Button
                        variant="primary"
                        size="icon"
                        className="absolute top-3 right-2 flex items-center"
                        onClick={togglePasswordVisibility}
                        type="button"
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </Button>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        className="pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="lg" className="w-full text-lg" disabled={isPending}>
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardContent className="flex flex-col gap-y-4">
        <Button
          variant="secondary"
          size="lg"
          className="w-full bg-background text-foreground border py-2"
        >
          <FcGoogle className="mr-2 size-5" />
          Signup with Google
        </Button>
      </CardContent>

      <CardContent className="">
        <p className="text-center">
          Already have an Account?{" "}
          <Link href={"/sign-in"}>
            <span className="text-primary">&nbsp;Login</span>
          </Link>{" "}
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
