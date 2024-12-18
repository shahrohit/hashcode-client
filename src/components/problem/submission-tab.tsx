/* eslint-disable @typescript-eslint/no-unused-vars */
"client";
import { useUserSubmission } from "@/hooks/use-submission";
import React, { useState } from "react";
import Loading from "../Loading";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { TUserSubmission } from "@/types/types";
import { cn } from "@/lib/utils";

const formateTime = (isoTime: string) => {
  const date = new Date(isoTime);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const SubmissionTab = () => {
  const { data: submissions, isPending } = useUserSubmission();

  const [index, setIndex] = useState<number | null>(null);

  if (isPending) return <Loading />;
  if (!submissions) return <div>No Submision</div>;
  if (submissions.length == 0) return <div>No Submissions</div>;

  const handleSelect = (index: number | null) => {
    setIndex(index);
  };

  return (
    <div className="p-1 px-4">
      {index !== null && (
        <Button variant="ghost" size="sm" onClick={() => handleSelect(null)}>
          <ArrowLeft className="size-6" />
        </Button>
      )}

      {index === null ? (
        <SubmissionList submissions={submissions} handleSelect={handleSelect} />
      ) : (
        <SubmissionDetail submission={submissions[index]} />
      )}
    </div>
  );
};

const SubmissionDetail = ({ submission }: { submission: TUserSubmission }) => {
  const status = submission.status;
  return (
    <div className="px-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2
          className={cn(
            "text-xl font-bold",
            status === "Accepted" ? "text-green-500" : "text-red-500"
          )}
        >
          {status}
        </h2>
        <span className="text-sm text-muted-foreground">
          | {formateTime(submission.timestamp)}
        </span>
      </div>
      <div>
        <span className="text-lg">Language : {submission.language}</span>
      </div>
      <div className="flex justify-center my-2">
        <span className="text-lg font-bold">
          Testcases passed : {submission.acceptedCount} /{" "}
          {submission.testcaseCount}
        </span>
      </div>
      {(status === "WrongAnswer" || status === "TLE") && (
        <>
          <div className="my-2">
            <span className="text-lg font-semibold">Input</span>
            {submission.input?.split("\n").map((val, index) => {
              return (
                <div
                  key={index}
                  className="flex my-2 flex-col bg-secondary rounded-md w-full p-2"
                >
                  <span className="text-muted-foreground">
                    Param {index + 1} ={" "}
                  </span>
                  <span>{val}</span>
                </div>
              );
            })}
          </div>

          <div className="my-2">
            <span className="text-lg font-semibold">Output</span>
            <div className="h-12 flex items-center bg-red-500/10 text-red-500 rounded-md w-full p-2">
              <span>{submission.executionOutput}</span>
            </div>
          </div>

          <div className="my-2">
            <span className="text-lg font-semibold">Expected Output</span>
            <div className="h-12 flex items-center bg-green-500/10 text-green-500 rounded-md w-full p-2">
              <span>{submission.output}</span>
            </div>
          </div>
        </>
      )}

      {status === "CompiledError" && (
        <>
          <div className="flex flex-col bg-red-500/10 text-red-500 rounded-md w-full p-2">
            <pre className="text-wrap">{submission.executionOutput}</pre>
          </div>
        </>
      )}
      {status === "RTE" && (
        <>
          <div className="flex flex-col bg-red-500/10 text-red-500 rounded-md w-full p-2">
            <pre className="text-wrap">{submission.executionOutput}</pre>
          </div>
        </>
      )}
    </div>
  );
};
const SubmissionList = ({
  submissions,
  handleSelect,
}: {
  submissions: TUserSubmission[];
  handleSelect: (index: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {submissions.map((submission, index) => {
        return (
          <div
            key={submission.id}
            className="flex items-center justify-between px-8 gap-10 bg-secondary p-2 rounded-lg cursor-pointer"
            onClick={() => handleSelect(index)}
          >
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-bold",
                  submission.status === "Accepted"
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                {submission.status}
              </span>
              <span className="text-muted-foreground text-sm">
                {formateTime(submission.timestamp)}
              </span>
            </div>
            <span className="font-semibold">{submission.language}</span>
          </div>
        );
      })}
    </div>
  );
};
export default SubmissionTab;
