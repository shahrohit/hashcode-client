"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import useTestcases from "@/hooks/useTestcase";
import { Testcase } from "@/types/response-type";

const ProblemTestcase = ({
  testcase,
  slug,
}: {
  testcase: Testcase;
  slug: string;
}) => {
  const {
    testcases,
    activeTab,
    setActiveTab,
    parseTestcase,
    updateTestcaseParam,
    addTestcase,
    deleteTestcase,
    hasMaxcase,
    resetTestcase,
  } = useTestcases(slug, testcase.sampleTestcases);

  const paramsName = testcase.parameterName.split("\n");

  const handleDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    deleteTestcase(index);
  };

  const handleReset = () => {
    resetTestcase();
    toast.info("Testcase Reset");
  };

  return (
    <div className="p-2">
      <h2 className="text-lg font-bold mb-4">Test Cases</h2>

      {/* Tab Header */}
      <div className="flex items-center flex-wrap gap-3 mb-4">
        {testcases.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => setActiveTab(index)}
            className={cn(
              "border-accent relative group",
              activeTab === index && "bg-secondary font-semibold"
            )}
          >
            <span>Case {index + 1}</span>
            {testcases.length > 1 && (
              <X
                onClick={(e) => {
                  handleDelete(e, index);
                }}
                className="p-px size-4 absolute -top-1 -right-1 bg-red-600 rounded-full hidden group-hover:block"
              />
            )}
          </Button>
        ))}
        {!hasMaxcase && (
          <Button variant="primary" onClick={addTestcase} size="sm">
            <Plus />
          </Button>
        )}
      </div>

      {/* Test case Editor */}
      {testcases.map((testcase, index) => {
        const params = parseTestcase(testcase);
        return (
          activeTab === index && (
            <div key={index} className="p-4 border rounded mb-4">
              <div className="space-y-2">
                {params.map((param, paramIndex) => (
                  <div key={paramIndex}>
                    <p className="font-semibold">{paramsName[paramIndex]} = </p>
                    <Input
                      type="text"
                      value={param}
                      onChange={(e) =>
                        updateTestcaseParam(index, paramIndex, e.target.value)
                      }
                      placeholder={`Enter Testcase`}
                      className="text-base font-semibold tracking-wider focus-visible:ring-0  outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        );
      })}

      <Button variant="ghost" onClick={handleReset}>
        Reset Testcase
      </Button>
    </div>
  );
};

export default ProblemTestcase;
