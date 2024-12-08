import HeaderMenu from "../main/header-menu";
import Image from "next/image";
import { LOGO_URL } from "@/utils/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import { ProblemSheet } from "./problem-sheet";
import { CloudUpload } from "lucide-react";
import { HiPlay } from "react-icons/hi2";

const ProblemHeader = () => {
  return (
    <div className="flex justify-between items-center px-3 h-full">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={LOGO_URL}
            height={42}
            width={42}
            alt="Logo"
            className="h-full"
          />
        </Link>
        <div className="hidden xs:block">
          <ProblemSheet />
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" className="gap-2 font-bold">
          <HiPlay className="size-5" />
          <span>Run</span>
        </Button>

        <Button variant="secondary" className="gap-2 text-green-500 font-bold">
          <CloudUpload className="size-5" />
          <span>Submit</span>
        </Button>
      </div>

      <div className="hidden sm:block">
        <HeaderMenu />
      </div>
    </div>
  );
};

export default ProblemHeader;