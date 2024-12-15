/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ListCheck, SquareChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProblemTestcase from "./problem-testcase";
import useRunStore from "@/store/run-store";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import TestcaseResultTab from "./TestcaseResultTab";
import { useProblemTestcases } from "@/hooks/use-problem";
import Loading from "../Loading";
import { BACKEND_URL } from "@/config/config";
import { useRun } from "@/hooks/use-run";
import { REGISTER, RUN } from "@/utils/socket-events";
import createSocket from "@/utils/socket-io";

const TestCaseContainer = ({ slug }: { slug: string }) => {
  const { data, isPending } = useProblemTestcases(slug);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeTab, setActiveTab] = useState("testcase");
  const { user } = useAuth();
  const { setId } = useRunStore();
  const [response, setResponse] = useState<object | null>(null);

  const handleResponse = (runResponse: any) => {
    setResponse(runResponse);
    setActiveTab("result");
  };
  useEffect(() => {
    if (!user || socket) return;
    const newSocket = createSocket();
    const id = uuidv4();
    setId(id);
    setSocket(newSocket);
    newSocket.emit(REGISTER, id);

    newSocket.on(RUN, handleResponse);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  return (
    <div className="h-full">
      <Tabs defaultValue="testcase" className="h-full" value={activeTab}>
        <TabsList className="flex bg-secondary rounded-none py-5 justify-start *:min-w-[175px] overflow-x-scroll overflow-y-hidden hide-scrollbar">
          <TabsTrigger
            value="testcase"
            className="flex items-center gap-2"
            onClick={() => setActiveTab("testcase")}
          >
            <ListCheck className="size-6 bg-blue-600/20 text-blue-600 rounded-full p-1" />
            <span className="text-base font-bold">Testcase</span>
          </TabsTrigger>
          <TabsTrigger
            value="result"
            className="flex items-center gap-2"
            onClick={() => setActiveTab("result")}
          >
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
              <ProblemTestcase testcase={data} slug={slug} />
            ) : (
              <div>No Testcase</div>
            )}
          </TabsContent>
          <TabsContent value="result">
            <TestcaseResultTab result={response} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TestCaseContainer;
