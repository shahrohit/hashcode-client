import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="size-4 animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
