"use client";
import { cn } from "@/lib/utils";
import { routes } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden xmd:block flex-1 pl-7">
      <ul className="flex justify-center lg:justify-start">
        {routes.map((route) => {
          const isActive = pathname != "/" && route.href.startsWith(pathname);

          return (
            <Link key={route.href} href={route.href}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 text-lg font-semibold hover:text-foreground transition text-secondary-foreground",
                  isActive && "shadow-sm hover:text-primary text-primary"
                )}
              >
                {route.label}
              </div>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
