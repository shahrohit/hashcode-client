"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { useProblems } from "@/hooks/use-problem";
import debounce from "lodash.debounce";

const ProblemSet = () => {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const { data: problems, isPending } = useProblems(query);

  const debouncedSearch = useMemo(
    () => debounce((value) => setQuery(value), 500),
    []
  );

  const handleInputChange = (value: string) => {
    setSearchText(value);
    debouncedSearch(value);
  };
  return (
    <div className="mt-7">
      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 py-4">
        <div className="flex gap-2"></div>

        <Input
          placeholder="Search Problem..."
          value={searchText}
          onChange={(event) => handleInputChange(event.target.value)}
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
