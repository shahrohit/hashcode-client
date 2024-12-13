import HeaderMenu from "../main/header-menu";
import Image from "next/image";
import { LOGO_URL } from "@/utils/constants";
import Link from "next/link";
import { ProblemSheet } from "./problem-sheet";
import SubmitProblem from "./submit-problem";
import RunProblem from "./run-problem";

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
        <RunProblem />
        <SubmitProblem />
      </div>

      <div className="hidden sm:block">
        <HeaderMenu />
      </div>
    </div>
  );
};

export default ProblemHeader;
