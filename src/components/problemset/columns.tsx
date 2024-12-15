"use client";

import { ProblemStatus } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, CheckCheck, CircleDot } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Difficulty, ProblemView, Topic } from "@/types/response-type";

const difficultyColor = {
  Basic: "text-blue-500",
  Easy: "text-green-600",
  Medium: "text-medium",
  Hard: "text-red-500",
};

export const columns: ColumnDef<ProblemView>[] = [
  {
    accessorKey: "status",
    header: () => <div className="w-5">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as ProblemStatus;
      if (status === "SOLVED") {
        return <CheckCheck className="size-5 text-green-600" />;
      } else if (status === "ATTEMPTED") {
        return <CircleDot className="size-5 text-medium" />;
      }
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="none"
          className="min-w-[200px]  text-base font-bold flex justify-between"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const slug = row.original.slug;
      const id = row.original.id;

      return (
        <Link
          href={`/problems/${slug}`}
          className="text-base text-secondary-foreground hover:text-primary cursor-pointer font-semibold"
        >
          {id}. {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: () => <div>Difficulty</div>,
    cell: ({ row }) => {
      const status = row.getValue("difficulty") as Difficulty;
      return (
        <div className={cn("font-semibold", difficultyColor[status])}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "topics",
    header: () => {
      return <h2 className="min-w-[100px] text-center">Topics</h2>;
    },
    cell: ({ row }) => {
      const topics = row.getValue("topics") as Topic[];
      return (
        <div className="flex gap-1.5 justify-center">
          {topics?.map((topic, index) => {
            return (
              <span
                key={index}
                className="text-sm text-secondary-foreground font-semibold border px-2 py-0.5 rounded-full"
              >
                {topic.name}
              </span>
            );
          })}
        </div>
      );
    },
  },
];
