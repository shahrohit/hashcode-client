"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProblems } from "@/hooks/use-problem";
import { cn } from "@/lib/utils";
import { ListTodo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading from "../Loading";

const difficultyColor = {
  Basic: "text-blue-500",
  Easy: "text-green-600",
  Medium: "text-medium",
  Hard: "text-red-500",
};

export function ProblemSheet() {
  const { data: problems, isPending } = useProblems("");

  const pathname = usePathname();
  const topic = pathname.split("/")[2];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-accent"
        >
          <ListTodo className="size-4" strokeWidth={2.5} />
          <span>Problem List</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Problem List</SheetTitle>
        </SheetHeader>

        <ul
          className="flex flex-col gap-3 mt-2 overflow-scroll hide-scrollbar"
          style={{ height: "calc(100vh - 70px)" }}
        >
          {isPending ? (
            <Loading />
          ) : (
            problems?.map((problem) => {
              const diff = problem.difficulty;
              return (
                <Link
                  href={`/problems/${problem.slug}`}
                  key={problem.id}
                  className={cn(
                    "flex justify-between gap-2 bg-secondary rounded-lg text-secondary-foreground px-5 py-3",
                    topic == problem.slug &&
                      "bg-secondary-foreground text-background font-semibold "
                  )}
                >
                  <div>
                    {problem.id}. {problem.title}
                  </div>
                  <span className={difficultyColor[diff]}>
                    {problem.difficulty}
                  </span>
                </Link>
              );
            })
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
