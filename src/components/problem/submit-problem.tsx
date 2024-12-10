"use client";
import React from "react";
import { Button } from "../ui/button";
import { CloudUpload } from "lucide-react";
import useSubmissionStore from "@/store/submission-store";
import { useSubmission } from "@/hooks/use-submission";

const SubmitProblem = () => {
  const { problemSlug, code, language } = useSubmissionStore();
  const { mutate, isPending } = useSubmission();
  const handleSubmit = () => {
    if (!problemSlug || !language || !code) {
      alert("Empty");
      return;
    }
    mutate({
      problem: problemSlug,
      language,
      code,
    });
  };
  return (
    <Button
      variant="secondary"
      className="gap-2 text-green-500 font-bold"
      onClick={handleSubmit}
      disabled={isPending}
    >
      <CloudUpload className="size-5" />
      <span>Submit</span>
    </Button>
  );
};

export default SubmitProblem;
