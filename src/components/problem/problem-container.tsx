import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import CodeEditorContainer from "./code-editor-container";
import ProblemInfoContainer from "./problem-info-container";
import TestCaseContainer from "./testcase-container";

export function ProblemContainer({ slug }: { slug: string }) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border-2"
      style={{
        height: "calc(100vh - 4.5rem)",
      }}
    >
      <ResizablePanel defaultSize={40}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={94} minSize={7}>
            <ProblemInfoContainer slug={slug} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={6} minSize={6}>
            <TestCaseContainer slug={slug} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={60} className="">
        <CodeEditorContainer slug={slug} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
