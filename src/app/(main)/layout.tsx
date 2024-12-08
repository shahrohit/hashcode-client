import HeaderMenu from "@/components/main/header-menu";
import NavBar from "@/components/main/nav-bar";
import { LOGO_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto">
      <div className="mx-auto max-w-screen-2xl">
        <section className="bg-background sticky top-0 left-0 z-50 w-full px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src={LOGO_URL} height={56} width={56} alt="Logo" />

            <h1 className="hidden xxs:block text-2xl xs:text-3xl font-semibold">
              HashCode
            </h1>
          </Link>

          <NavBar />
          <HeaderMenu />
        </section>
        <div className="flex items-center justify-center pt-0 px-1 xs:px-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
