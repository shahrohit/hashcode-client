import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguages } from "@/hooks/use-language";
import { Language } from "@/types/response-type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ProblemLanguage = ({
  currLang,
  setCurrLang,
}: {
  currLang: string;
  setCurrLang: Dispatch<SetStateAction<string>>;
}) => {
  const [languages, setLanguages] = useState<Language[]>([
    { name: "C++", lang: "cpp" },
    { name: "Java", lang: "java" },
    { name: "Python", lang: "python" },
  ]);

  const { data, isSuccess } = useLanguages();

  useEffect(() => {
    if (isSuccess && data) {
      setLanguages(data);
    }
  }, [isSuccess, data]);

  return (
    <Select
      defaultValue="cpp"
      value={currLang}
      onValueChange={(newVal) => setCurrLang(newVal)}
    >
      <SelectTrigger className="min-w-[120px] max-w-[180px] focus:ring-0 border-accent">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent className="border-accent text-base font-semibold">
        <SelectGroup>
          {languages?.map((language) => {
            return (
              <SelectItem key={language.lang} value={language.lang}>
                {language.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProblemLanguage;
