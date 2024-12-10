/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  BookOpen,
  CheckCheck,
  CircleX,
  FileText,
  Send,
  Trash,
  X,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProblemDescription from "./problem-description";
import SubmissionTab from "./submission-tab";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { SOCKET_URL } from "@/utils/constants";
import { io, Socket } from "socket.io-client";
import useSubmissionStore from "@/store/submission-store";
import ResponseTab from "./ResponseTab";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";

const ProblemInfoContainer = ({ slug }: { slug: string }) => {
  const [tabs, setTabs] = useState([
    {
      value: "description",
      title: "Description",
      content: <ProblemDescription slug={slug} />,
      persist: true,
      icon: (
        <FileText className="size-6 bg-blue-600/20 text-blue-600 rounded-full p-1" />
      ),
    },
    {
      value: "editorial",
      title: "Editorial",
      content: <div>Editorial Content</div>,
      persist: true,
      icon: (
        <BookOpen className="size-6 bg-yellow-600/20 text-yellow-600 rounded-full p-1" />
      ),
    },
    {
      value: "submission",
      title: "Submission",
      content: <SubmissionTab />,
      persist: true,
      icon: (
        <Send className="size-6 bg-green-600/20 text-green-600 rounded-full p-1" />
      ),
    },
  ]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const { user } = useAuth();
  const tabsRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const { setId } = useSubmissionStore();

  useEffect(() => {
    if (!user) return;
    if (socket) return;
    const newSocket = io(SOCKET_URL, {
      path: "/socket.io", // Ensure the path matches your proxy setup
      transports: ["websocket"],
    });
    const id = uuidv4();
    setId(id);
    setSocket(newSocket);
    newSocket.emit("register", id);

    newSocket.on("response", (response) => {
      // Add a new tab when a response is received
      const value = `response-${Date.now()}`;
      const icon =
        response.status === "Accepted" ? (
          <CheckCheck className="size-6 bg-green-600/20 text-green-600 rounded-full p-1" />
        ) : (
          <CircleX className="size-6 bg-red-600/20 text-red-600 rounded-full p-1" />
        );

      setTabs((prevTabs) => [
        ...prevTabs,
        {
          value, // Unique identifier for the tab
          title: `${response.status ?? "Result"}`,
          content: <ResponseTab data={response} />, // The content received from the socket
          persist: false,
          icon: icon,
        },
      ]);
      setActiveTab(value);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

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
          className="flex gap-4 bg-secondary rounded-none py-5 justify-start *:min-w-[150px] overflow-scroll hide-scrollbar "
        >
          {tabs.map((tab) => {
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
                <span>{tab.icon}</span>

                <span className="text-base font-bold">{tab.title}</span>
                {!tab.persist && (
                  <X
                    className="h-4 w-4 hover:text-red-500 absolute top-0 -right-2  rounded-full"
                    onClick={(e) => handleCloseTab(e, tab.value)}
                  />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div
          className="min-w-[200px] overflow-y-auto"
          style={{
            height: "calc(100% - 43px)",
          }}
        >
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ProblemInfoContainer;
