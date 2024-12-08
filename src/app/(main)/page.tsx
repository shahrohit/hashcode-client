import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex">
      <Link href="/problemset">
        <h1 className="text-xl flex items-center gap-2 bg-primary p-2 rounded-lg">
          <span>Solve Prolems</span>
          <span>
            <ArrowRight />
          </span>
        </h1>
      </Link>
    </main>
  );
}
