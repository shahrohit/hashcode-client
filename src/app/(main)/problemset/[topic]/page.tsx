import { HourglassIcon } from "lucide-react";

type Props = {
  params: { topic: string };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProblemTopicPage = ({ params }: Props) => {
  return (
    <main className="">
      <p className="flex gap-2 items-center text-4xl font-semibold text-muted-foreground">
        <span>This page is under progress</span>
        <HourglassIcon className="h-8 w-8" />
      </p>
    </main>
  );
};

export default ProblemTopicPage;
