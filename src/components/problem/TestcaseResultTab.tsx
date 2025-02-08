"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dot } from "lucide-react";
import Loading from "../Loading";

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

const TestcaseResultTab = ({ result }: { result: any }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    if (result) {
      fetch();
    }
  }, [result]);
  if (!result) return <div>Please run the testcase</div>;
  if (loading) return <Loading />;

  const status = result.status;
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
          | {formateTime(result.timestamp)}
        </span>
      </div>

      {status === "CompiledError" ? (
        <>
          <div className="flex flex-col bg-red-500/10 text-red-500 rounded-md w-full p-2">
            <pre className="text-wrap">{result.error}</pre>
          </div>
        </>
      ) : (
        <Component result={result} />
      )}
    </div>
  );
};

const Component = ({ result }: { result: any }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div className="flex items-center flex-wrap gap-3 mb-4">
        {result?.data?.map((tcase: any, index: number) => {
          return (
            <Button
              key={index}
              variant="outline"
              onClick={() => setActiveTab(index)}
              className={cn(
                "border-accent relative text-base",
                activeTab === index && "bg-secondary font-semibold"
              )}
            >
              <span>
                <Dot
                  className={cn(
                    "h-7 w-7",
                    tcase.status === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                />
              </span>
              <span>case {index + 1}</span>
            </Button>
          );
        })}
      </div>
      <div>
        <div className="my-2">
          <span className="text-lg font-semibold">Input</span>
          {result.data[activeTab].input
            ?.split("\n")
            .map((val: string, index: number) => {
              return (
                <div
                  key={index}
                  className="flex my-2 flex-col bg-secondary rounded-md w-full p-2"
                >
                  <span className="text-muted-foreground">
                    Param {index + 1} =
                  </span>
                  <span>{val}</span>
                </div>
              );
            })}
        </div>

        <div className="my-2">
          <span className="text-lg font-semibold">Output</span>
          <div className="min-h-12 flex items-center bg-secondary rounded-md w-full p-2">
            <span>{result.data[activeTab].executionOutput}</span>
          </div>
        </div>

        <div className="my-2">
          <span className="text-lg font-semibold">Expected Output</span>
          <div className="min-h-12 flex items-center bg-secondary rounded-md w-full p-2">
            <span>{result.data[activeTab].output}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestcaseResultTab;
