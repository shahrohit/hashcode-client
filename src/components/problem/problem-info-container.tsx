"use client";
import {
  CheckCheck,
  CircleAlert,
  CircleMinus,
  FileText,
  Send,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProblemDescription from "./problem-description";
import SubmissionTab from "./submission-tab";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

import { Socket } from "socket.io-client";
import useSubmissionStore from "@/store/submission-store";
import ResponseTab from "./ResponseTab";
import { v4 as uuidv4 } from "uuid";
import createSocket from "@/utils/socket-io";
import { REGISTER, SUBMIT } from "@/utils/socket-events";
import { useQueryClient } from "@tanstack/react-query";

const iconClass = {
  blue: "size-6 rounded-full p-1 bg-blue-600/20 text-blue-600",
  yellow: "size-6 rounded-full p-1 bg-yellow-600/20 text-yellow-600",
  green: "size-6 rounded-full p-1 bg-green-600/20 text-green-600",
  red: "size-6 rounded-full p-1 bg-red-600/20 text-red-600",
};

type Tab = {
  value: string;
  title: string;
  content: any;
};

const getIcon = (tab: string) => {
  if (tab === "Accepted") return <CheckCheck className={iconClass.green} />;
  else if (tab === "Result")
    return <CircleMinus className={iconClass.yellow} />;
  return <CircleAlert className={iconClass.red} />;
};

const ProblemInfoContainer = ({ slug }: { slug: string }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const { user } = useAuth();
  const tabsRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const queryClient = useQueryClient();

  const { setSocketKey } = useSubmissionStore();

  const handleResponse = (response: any) => {
    const value = `response-${Date.now()}`;

    setTabs((prevTabs) => [
      ...prevTabs,
      {
        value,
        title: `${response.status ?? "Result"}`,
        content: response,
      },
    ]);
    queryClient.invalidateQueries({
      queryKey: ["submissions"],
    });
    setActiveTab(value);
  };

  const handleCloseTab = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    tabValue: string
  ) => {
    e.stopPropagation();
    const newTabs = tabs.filter((tab) => {
      return tab.value !== tabValue;
    });

    if (activeTab === tabValue) {
      setActiveTab("description");
    }
    setTabs(newTabs);
  };

  useEffect(() => {
    if (!user || socket) return;

    const newSocket = createSocket();
    const key = uuidv4();
    setSocketKey(key);
    setSocket(newSocket);

    newSocket.emit(REGISTER, key);
    newSocket.on(SUBMIT, handleResponse);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const tabRef = tabsRefs.current[activeTab];
    if (tabRef) {
      tabRef.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  return (
    <div className="h-full">
      <Tabs defaultValue="description" className="h-full" value={activeTab}>
        <TabsList
          defaultValue="description"
          className="flex gap-4 bg-secondary rounded-none py-5 justify-start overflow-x-scroll overflow-y-hidden hide-scrollbar *:min-w-[150px] "
        >
          <TabsTrigger
            value="description"
            className="flex items-center gap-2 relative"
            onClick={() => setActiveTab("description")}
            ref={(el) => {
              tabsRefs.current["description"] = el;
            }}
          >
            <FileText className={iconClass.blue} />

            <span className="text-base font-bold">Description</span>
          </TabsTrigger>

          <TabsTrigger
            value="submission"
            className="flex items-center gap-2 relative"
            onClick={() => setActiveTab("submission")}
            ref={(el) => {
              tabsRefs.current["submission"] = el;
            }}
          >
            <Send className={iconClass.green} />

            <span className="text-base font-bold">Submission</span>
          </TabsTrigger>

          {tabs.map((tab) => {
            const icon = getIcon(tab.title);
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 relative"
                onClick={() => setActiveTab(tab.value)}
                ref={(el) => {
                  tabsRefs.current[tab.value] = el;
                }}
              >
                {icon}
                <span className="text-base font-bold">{tab.title}</span>
                <X
                  className="h-4 w-4 hover:text-red-500 absolute top-0 -right-2  rounded-full"
                  onClick={(e) => handleCloseTab(e, tab.value)}
                />
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div
          className="min-w-[300px] overflow-y-auto"
          style={{
            height: "calc(100% - 43px)",
          }}
        >
          <TabsContent value="description">
            <ProblemDescription slug={slug} />
          </TabsContent>
          <TabsContent value="submission">
            <SubmissionTab />
          </TabsContent>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <ResponseTab data={tab.content} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ProblemInfoContainer;
