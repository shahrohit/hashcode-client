import { cn } from "@/lib/utils";
import { TExecutionJob } from "@/types/types";
import React from "react";

type Props = {
  data: TExecutionJob;
};

const SubmitResult = ({ data }: Props) => {
  const status = data.status;

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
          | {formateTime(data.timestamp)}
        </span>
      </div>
      <div>
        <span className="text-lg">Language : {data.language}</span>
      </div>
      <div className="flex justify-center my-2">
        <span className="text-lg font-bold">
          Testcases passed : {data.acceptedCount} / {data.testcaseCount}
        </span>
      </div>
      {(status === "Wrong Answer" || status === "TLE") && (
        <>
          <div className="my-2">
            <span className="text-lg font-semibold">Input</span>
            {data.input?.split("\n").map((val, index) => {
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
              <span>{data.executionOutput}</span>
            </div>
          </div>

          <div className="my-2">
            <span className="text-lg font-semibold">Expected Output</span>
            <div className="h-12 flex items-center bg-green-500/10 text-green-500 rounded-md w-full p-2">
              <span>{data.output}</span>
            </div>
          </div>
        </>
      )}

      {status === "Compiled Error" && (
        <>
          <div className="flex flex-col bg-red-500/10 text-red-500 rounded-md w-full p-2">
            <pre className="text-wrap">{data.executionOutput}</pre>
          </div>
        </>
      )}
      {status === "RTE" && (
        <>
          <div className="flex flex-col bg-red-500/10 text-red-500 rounded-md w-full p-2">
            <pre className="text-wrap">{data.executionOutput}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default SubmitResult;
