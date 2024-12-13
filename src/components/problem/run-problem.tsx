"use client";
import React from "react";
import { Button } from "../ui/button";
import { HiPlay } from "react-icons/hi2";
import { useRun } from "@/hooks/use-run";
import useRunStore from "@/store/run-store";
import useSubmissionStore from "@/store/submission-store";

const RunProblem = () => {
  const { problemSlug, code, language } = useSubmissionStore();
  const { id, testcases } = useRunStore();
  const { mutate, isPending } = useRun();

  const handleSubmit = () => {
    if (!problemSlug || !language || !code) {
      alert("Empty");
      return;
    }
    mutate({
      id,
      problem: problemSlug,
      language,
      code,
      testcases,
    });
  };
  return (
    <Button
      variant="secondary"
      className="gap-2 font-bold"
      onClick={handleSubmit}
      disabled={isPending}
    >
      <HiPlay className="size-5" />
      <span>Run</span>
    </Button>
  );
};

export default RunProblem;
