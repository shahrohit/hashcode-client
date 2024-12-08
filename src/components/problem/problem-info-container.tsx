import { BookOpen, FileText, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProblemDescription from "./problem-description";

const ProblemInfoContainer = ({ slug }: { slug: string }) => {
  return (
    <div className="h-full">
      <Tabs defaultValue="description" className="h-full">
        <TabsList
          defaultValue="description"
          className="flex bg-secondary rounded-none py-5 justify-start *:min-w-[150px] overflow-scroll hide-scrollbar "
        >
          <TabsTrigger value="description" className="flex items-center gap-2">
            <FileText className="size-6 bg-blue-600/20 text-blue-600 rounded-full p-1" />
            <span className="text-base font-bold">Description</span>
          </TabsTrigger>
          <TabsTrigger value="editorial" className="flex items-center gap-2">
            <BookOpen className="size-6 bg-medium/20 text-medium rounded-full p-1" />
            <span className="text-base font-bold">Editorial</span>
          </TabsTrigger>
          <TabsTrigger value="submission" className="flex items-center gap-2">
            <Send className="size-6 bg-green-600/20 text-green-600 rounded-full p-1" />
            <span className="text-base font-bold">Submission</span>
          </TabsTrigger>
        </TabsList>

        <div
          className="min-w-[200px] overflow-y-auto"
          style={{
            height: "calc(100% - 43px)",
          }}
        >
          <TabsContent value="description">
            <ProblemDescription slug={slug} />
          </TabsContent>
          <TabsContent value="editorial">Editorial</TabsContent>
          <TabsContent value="submission">Submission</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProblemInfoContainer;
