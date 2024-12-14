"use client";

import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import SignInCard from "./sign-in-card";

const SingIn = () => {
  const { user } = useAuth();
  if (user) return redirect("/");
  return <SignInCard />;
};

export default SingIn;
