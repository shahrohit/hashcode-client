"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { problemLists } from "@/utils/constants";
import { ListTodo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProblemSheet() {
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
          {problemLists.map((problem) => {
            const diff = problem.difficulty;
            return (
              <Link
                href={`/problems/${problem.name}`}
                key={problem.id}
                className={cn(
                  "flex justify-between gap-2 bg-secondary rounded-lg text-secondary-foreground px-5 py-3",
                  topic == problem.name &&
                    "bg-secondary-foreground text-background font-semibold"
                )}
              >
                <div>
                  {problem.id}. {problem.title}
                </div>
                <span
                  className={cn(
                    diff === "EASY"
                      ? "text-green-600"
                      : diff === "MEDIUM"
                      ? "text-medium"
                      : "text-red-600"
                  )}
                >
                  {problem.difficulty.toLocaleLowerCase()}
                </span>
              </Link>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
