"use client";
import { Code } from "lucide-react";

import dynamic from "next/dynamic";

import ProblemLanguage from "./problem-language";
import { useState } from "react";
import { useCodes } from "@/hooks/use-code";
import Loading from "../Loading";
import { notFound } from "next/navigation";

const CodeEditor = dynamic(() => import("./code-editor"), { ssr: false });

const CodeEditorContainer = ({ slug }: { slug: string }) => {
  const [language, setLanguage] = useState("cpp");
  const { data, isPending } = useCodes(slug);

  if (isPending) return <Loading />;
  if (!data) {
    return notFound();
  }

  return (
    <div className="h-full">
      <section className="flex bg-secondary h-10 px-2 py-1 *:min-w-[200px] overflow-scroll hide-scrollbar ">
        <div className="flex items-center gap-2 py-1">
          <Code className="size-6 bg-green-600/20 text-green-600 rounded-full p-1" />
          <span className="text-base font-bold">Code</span>
        </div>
      </section>

      <section className="flex justify-between px-2 py-1 border-b border-accent">
        <ProblemLanguage currLang={language} setCurrLang={setLanguage} />
        {/* <Button variant="ghost">
          <RotateCcw
            className="size-4 text-secondary-foreground"
            strokeWidth={2.5}
            onClick={() => {
              setResetFlag(!resetFlag);
            }}
          />
        </Button> */}
      </section>

      <div className="h-full w-full ">
        <CodeEditor language={language} code={data[language]} />
      </div>
    </div>
  );
};

export default CodeEditorContainer;
