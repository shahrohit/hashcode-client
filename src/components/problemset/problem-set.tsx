"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState } from "react";
import { Input } from "../ui/input";
import { useProblems } from "@/hooks/use-problem";

const ProblemSet = () => {
  const { data: problems, isPending } = useProblems();
  const [searchText, setSearchText] = useState("");

  return (
    <div className="mt-7">
      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 py-4">
        <div className="flex gap-2"></div>

        <Input
          placeholder="Search Problem..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="max-w-sm"
        />
      </div>

      <DataTable
        columns={columns}
        data={problems ?? []}
        isPending={isPending}
        searchText={searchText}
      />
    </div>
  );
};

export default ProblemSet;
