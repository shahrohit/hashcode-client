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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { LOGO_URL } from "@/utils/constants";
import { Button } from "../ui/button";
import forgotPasswordSchema, {
  TForgotPassword,
} from "@/schemas/forgot-password-schema";

const ForgotPasswordCard = () => {
  const form = useForm<TForgotPassword>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const onSubmit = (values: TForgotPassword) => {
    console.log({ values });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-2 shadow-none">
      <CardHeader className="flex items-center justify-center">
        <Image src={LOGO_URL} height={56} width={56} alt="Logo" />
        <CardTitle className="text-2xl font-semibold ">HashCode</CardTitle>
        <CardDescription className="text-center">
          Enter your Email address below, and we will send you an Email allowing
          you to reset it.
        </CardDescription>
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
            <Button size="lg" className="w-full text-lg">
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordCard;
