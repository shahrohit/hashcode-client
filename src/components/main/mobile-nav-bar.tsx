"use client";
import { X, Menu } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { routes } from "@/utils/constants";
import { useAuth } from "@/hooks/use-auth";

const MobileNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div className="">
      <Button
        variant="none"
        size="icon"
        className="size-8 hover:bg-secondary"
        onClick={() => setShowNav(!showNav)}
      >
        <Menu />
      </Button>

      {showNav && (
        <section className="fixed top-0 left-0 z-30 w-screen min-h-screen bg-background">
          <div className="flex flex-col items-center  w-full h-full md:w-[80%] mx-auto py-10">
            <Button
              variant="none"
              size="icon"
              className="self-end size-8 mx-2  hover:bg-destructive/20 text-destructive"
              onClick={() => setShowNav(false)}
            >
              <X />
            </Button>

            <nav className="pl-7">
              <ul className="flex flex-col items-center justify-center lg:justify-start">
                {routes.map((route) => {
                  const isActive =
                    pathname != "/" && route.href.startsWith(pathname);

                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setShowNav(false)}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-2.5 p-2.5 text-lg font-semibold hover:text-foreground transition text-secondary-foreground",
                          isActive &&
                            "shadow-sm hover:text-primary text-primary"
                        )}
                      >
                        {route.label}
                      </div>
                    </Link>
                  );
                })}
              </ul>
            </nav>
            {!user && (
              <section className="flex items-center gap-3 py-5">
                <Button variant="secondary" size="lg" className="text">
                  <Link href="/sign-up">Register</Link>
                </Button>
                <Button size="lg">
                  <Link href="/sign-in">Login</Link>
                </Button>
              </section>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default MobileNavbar;
