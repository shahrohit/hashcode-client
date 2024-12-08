"use client";
import { useTopics } from "@/hooks/use-topics";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const Topics = () => {
  const { data: topics, isPending } = useTopics();
  return (
    <div className="w-full flex flex-col gap-2">
      {isPending ? (
        <div className="flex items-center gap-4 w-full justify-between">
          {Array(5)
            .fill(undefined)
            .map((_, idx) => {
              return (
                <Skeleton key={idx} className="h-8 w-[200px]  bg-secondary" />
              );
            })}
        </div>
      ) : (
        <ul
          className={
            "flex items-center gap-4 overflow-scroll hide-scrollbar cursor-all-scroll"
          }
        >
          {topics?.map((topic) => {
            return (
              <Link
                href={`/problemset/${topic.slug}`}
                key={topic.name}
                className="flex-1 text-center min-w-fit  txt-shadow py-1 px-2 rounded-3xl text-base font-semibold group hover:text-primary"
              >
                {topic.name}
                <span className="text-xs bg-secondary text-secondary-foreground group-hover:text-primary group-hover:bg-primary/10 rounded-full py-1 px-2 ml-1">
                  {topic.count}
                </span>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Topics;
