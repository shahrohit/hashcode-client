"use client";
import { Button } from "@/components/ui/button";
import { LOGO_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src={LOGO_URL} height={56} width={56} alt="Logo" />

            <h1 className="hidden xxs:block text-3xl font-semibold">
              HashCode
            </h1>
          </Link>

          <Button variant="primary" size="lg" className="rounded-2xl text-lg">
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              // className="bg-primary py-1 px-2 rounded-sm"
            >
              {isSignIn ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex items-center justify-center pt-4 w-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
