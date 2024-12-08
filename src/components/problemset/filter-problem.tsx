import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

type Props<T> = {
  title: string;
  selectedValue: T;
  values: {
    label: T;
    icon?: React.ReactNode;
    className?: string;
  }[];
  icons?: React.ReactNode[];
  handleSelect: (value: T) => void;
};

function FilterProblem<T>({ title, values, handleSelect }: Props<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-12 gap-2">
          {title}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {values?.map((value, index) => {
          const Icon = value.icon;
          return (
            <DropdownMenuItem
              key={index}
              onClick={() => handleSelect(value.label)}
            >
              {Icon}
              <span className={value.className}>{String(value.label)}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterProblem;
