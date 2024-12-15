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

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { LOGO_URL } from "@/utils/constants";
import loginSchema, { type TLogin } from "@/schemas/login-schema";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { useLogin } from "@/hooks/user-login";
import { FcGoogle } from "react-icons/fc";
import { handleGoogleAuth } from "@/utils/handle-oauth";

const SignInCard = () => {
  const { mutate: loginUser, isPending } = useLogin();

  const form = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (values: TLogin) => {
    loginUser(values);
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
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* TODO: Make Forget Password Feature */}
      {/* <CardContent>
        <Link href={"/forgot-password"}>
          <span className="text-primary">Forgot Password?</span>
        </Link>
      </CardContent> */}

      <CardContent className="flex flex-col gap-y-4">
        <Button
          variant="secondary"
          size="lg"
          className="w-full bg-background text-foreground border py-2"
          onClick={handleGoogleAuth}
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
      </CardContent>

      <CardContent className="">
        <p className="text-center">
          Don&apos;t have an Account?{" "}
          <Link href={"/sign-up"}>
            <span className="text-primary">&nbsp;Create Account</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
