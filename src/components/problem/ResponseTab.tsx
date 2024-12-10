import { TExecutionJob } from "@/types/types";

type Props = {
  data: TExecutionJob;
};

const formateTime = (isoTime: string) => {
  const date = new Date(isoTime);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const ResponseTab = ({ data }: Props) => {
  if (data.status === "Accepted") {
    return (
      <div className="px-3">
        <h2 className="text-green-500 text-xl font-bold">Accepted</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {formateTime(data.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  return <div>{data.status}</div>;
};

export default ResponseTab;
