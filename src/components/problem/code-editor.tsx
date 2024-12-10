/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAuth } from "@/hooks/use-auth";
import useSubmissionStore from "@/store/submission-store";
import { Editor, Monaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";

type Props = {
  language: string;
  code: string;
};

const CodeEditor = ({
  language = "cpp",
  code = "// Write Your code",
}: Props) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { setLanguage, setCode } = useSubmissionStore();

  const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null);

  const setCustomTheme = useCallback(
    (monaco: Monaco) => {
      monaco.editor.defineTheme("custom-theme", {
        base: theme === "dark" ? "vs-dark" : "vs",
        inherit: true,
        rules: [
          { token: "comment", foreground: "7f848e", fontStyle: "italic" },
          { token: "string", foreground: "98c379" },
          { token: "number", foreground: "d19a66" },
        ],
        colors: {
          "editor.background": theme === "dark" ? "#09090b" : "#ededed",
          "editor.foreground": theme === "dark" ? "#d9d9d9" : "#09090b",
        },
      });
      monaco.editor.setTheme("custom-theme");
    },
    [theme]
  );

  // Store Monaco instance when beforeMount is called
  const handleBeforeMount = (monaco: Monaco) => {
    setMonacoInstance(monaco);
    setCustomTheme(monaco);
  };

  useEffect(() => {
    setLanguage(language);
  }, [language]);

  useEffect(() => {
    setCode(code);
  }, [code]);

  // Update theme dynamically based on `theme` value
  useEffect(() => {
    if (monacoInstance) {
      setCustomTheme(monacoInstance);
    }
  }, [theme, monacoInstance, setCustomTheme]);

  return (
    <Editor
      defaultLanguage="cpp"
      theme="custom-theme"
      beforeMount={handleBeforeMount}
      language={language}
      options={{
        fontSize: 18,
        fontFamily: "Fira Code, monospace",
        minimap: { enabled: false },
        cursorBlinking: "expand",
        smoothScrolling: true,
        renderLineHighlight: "none",
        autoClosingBrackets: "always",
        readOnly: user ? false : true,
        readOnlyMessage: {
          value: "Please Login to make Changes",
        },
      }}
      value={code}
      onChange={(newCode) => {
        if (newCode) setCode(newCode);
      }}
    />
  );
};

export default CodeEditor;
