import React from "react";
import { AiFillFire } from "react-icons/ai";

const StreakIcon = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center gap-1 text-red-600  rounded-lg py-0.5 px-2">
      <AiFillFire className="size-6" />
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
};

export default StreakIcon;
