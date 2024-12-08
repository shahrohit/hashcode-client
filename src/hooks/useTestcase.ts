"use client";
import { Testcase } from "@/types/types";
import { useState } from "react";

// Custom hook to manage test cases
const useTestcases = (initialTestcases: Testcase) => {
  const [testcases, setTestcases] = useState(initialTestcases);
  const [activeTab, setActiveTab] = useState(0);

  const hasMaxcase = testcases.length >= 10;

  const parseTestcase = (testcase: string) => testcase.split("\\n");

  const updateTestcaseParam = (
    index: number,
    paramIndex: number,
    value: string
  ) => {
    const updatedTestcases = [...testcases];
    const params = parseTestcase(updatedTestcases[index]);
    params[paramIndex] = value;
    updatedTestcases[index] = params.join("\\n");
    setTestcases(updatedTestcases);
  };

  const addTestcase = () => {
    if (hasMaxcase) return;
    const currentParams = parseTestcase(testcases[activeTab]);
    const newTestcase = currentParams.map((val) => val).join("\\n");
    setTestcases([...testcases, newTestcase]);
    setActiveTab(testcases.length);
  };

  const deleteTestcase = (index: number) => {
    if (testcases.length === 1) return;
    const updatedTestcases = testcases.filter((_, i) => i !== index);
    setTestcases(updatedTestcases);

    if (activeTab < index) return;
    setActiveTab(Math.max(0, activeTab - 1));
  };

  const resetTestcase = () => {
    setTestcases(initialTestcases);
    setActiveTab(0);
  };

  return {
    testcases,
    activeTab,
    setActiveTab,
    parseTestcase,
    updateTestcaseParam,
    addTestcase,
    deleteTestcase,
    hasMaxcase,
    resetTestcase,
  };
};

export default useTestcases;
