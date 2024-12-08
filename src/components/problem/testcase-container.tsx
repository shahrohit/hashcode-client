"use client";
import { ListCheck, SquareChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProblemTestcase from "./problem-testcase";
import { useProblemTestcases } from "@/hooks/use-problem";
import Loading from "../Loading";

const TestCaseContainer = ({ slug }: { slug: string }) => {
  const { data, isPending } = useProblemTestcases(slug);

  return (
    <div className="h-full">
      <Tabs defaultValue="testcase" className="h-full">
        <TabsList className="flex bg-secondary rounded-none py-5 justify-start *:min-w-[175px] overflow-x-scroll hide-scrollbar">
          <TabsTrigger value="testcase" className="flex items-center gap-2">
            <ListCheck className="size-6 bg-blue-600/20 text-blue-600 rounded-full p-1" />
            <span className="text-base font-bold">Testcase</span>
          </TabsTrigger>
          <TabsTrigger value="result" className="flex items-center gap-2">
            <SquareChevronRight className="size-6 bg-medium/20 text-medium rounded-full p-1" />
            <span className="text-base font-bold">Testcase Result</span>
          </TabsTrigger>
        </TabsList>

        <div
          className="min-w-[200px] overflow-auto "
          style={{
            height: "calc(100% - 40px)",
          }}
        >
          <TabsContent value="testcase">
            {isPending ? (
              <Loading />
            ) : data ? (
              <ProblemTestcase testcase={data} />
            ) : (
              <div>No Testcase</div>
            )}
          </TabsContent>
          <TabsContent value="result">TestResult</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TestCaseContainer;
