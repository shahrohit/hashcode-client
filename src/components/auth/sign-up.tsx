"use client";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import SignUpCard from "./sign-up-card";

const SingUp = () => {
  const { user } = useAuth();
  if (user) return redirect("/");
  return <SignUpCard />;
};

export default SingUp;
