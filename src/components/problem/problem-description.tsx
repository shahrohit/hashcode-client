"use client";
import ReactMarkdown from "react-markdown";
import { Button } from "../ui/button";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProblemDescription } from "@/hooks/use-problem";
import Loading from "../Loading";
import { useState } from "react";
import { notFound } from "next/navigation";

const ProblemDescription = ({ slug }: { slug: string }) => {
  const { data: problem, isPending, isError } = useProblemDescription(slug);
  const [showTopic, setShowTopic] = useState(false);

  if (isPending) return <Loading />;
  if (isError) notFound();

  return (
    <section className="p-2 flex flex-col gap-3">
      <h1 className="text-2xl font-bold">
        {problem.id}. {problem.title}
      </h1>

      <div className="flex items-center gap-2">
        <Button
          variant="none"
          size="sm"
          className={cn(
            "rounded-full gap-2 text-sm  border-none h-7 cursor-default",
            problem.difficulty === "Basic" && "bg-blue-600/20 text-blue-600",
            problem.difficulty === "Easy" && "bg-green-600/20 text-green-600",
            problem.difficulty == "Medium" && "bg-medium/20 text-medium",
            problem.difficulty === "Hard" && "bg-hard-600/20 text-hard-600"
          )}
        >
          {problem.difficulty}
        </Button>
      </div>

      <div>
        <ReactMarkdown
          className="text-base font-normal text-secondary-foreground"
          components={{
            code: (props) => (
              <code
                className="bg-secondary rounded-sm px-2 border"
                {...props}
              />
            ),
            p: (props) => <p className="mb-2" {...props} />,
            strong: (props) => <strong className="text-lg" {...props} />,
          }}
        >
          {problem.description}
        </ReactMarkdown>
      </div>

      <div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-2 h-7"
          onClick={() => setShowTopic(!showTopic)}
        >
          <Tag className="size-3.5" />
          <span className="text-sm">{showTopic ? "Hide" : "Show"} Topics</span>
        </Button>

        {showTopic && (
          <div className="flex flex-wrap gap-2 my-2 ">
            {problem.topics.map((topic, index) => {
              return (
                <div
                  className="bg-secondary w-fit py-1 px-4 rounded-xl"
                  key={index}
                >
                  {topic.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProblemDescription;
