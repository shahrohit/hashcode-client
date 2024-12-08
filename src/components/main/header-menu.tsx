"use client";
import React from "react";
import { ModeToggle } from "../dark-mode-toggle";
import UserButton from "../user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileNavbar from "./mobile-nav-bar";
import { useAuth } from "@/hooks/use-auth";

const HeaderMenu = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <ModeToggle />

      {user ? (
        <UserButton username={user.username} />
      ) : (
        <section className="hidden sm:flex items-center gap-2">
          <Button variant="secondary" size="lg" className="rounded-2xl text-lg">
            <Link href="/sign-up">Register</Link>
          </Button>
          <Button variant="primary" size="lg" className="rounded-2xl text-lg">
            <Link href="/sign-in">Login</Link>
          </Button>
        </section>
      )}

      <div className="block xmd:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default HeaderMenu;
