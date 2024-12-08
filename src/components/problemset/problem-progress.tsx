import { stats } from "@/utils/constants";
import ProgressChart from "./progress-chart";

const ProblemProgress = () => {
  return (
    <section className="flex border p-2 rounded-md w-full sm:max-w-[350px]">
      <div className="w-1/2">
        <ProgressChart
          easy={stats.easy}
          medium={stats.medium}
          hard={stats.hard}
          totalEasy={stats.totalEasy}
          totalMedium={stats.totalMedium}
          totalHard={stats.totalHard}
        />
      </div>
      <div className="w-1/2 flex flex-col justify-evenly p-1">
        <div className="flex justify-around font-bold text-sm">
          <span className="text-green-600">Easy</span>
          <div className="">
            <span>{stats.easy} / </span>
            <span className="text-muted">{stats.totalEasy}</span>
          </div>
        </div>
        <div className="flex justify-around font-bold text-sm">
          <span className="text-medium">Medium</span>
          <div className="">
            <span>{stats.medium} / </span>
            <span className="text-muted">{stats.totalMedium}</span>
          </div>
        </div>
        <div className="flex justify-around font-bold text-sm">
          <span className="text-red-600">Hard</span>
          <div className="">
            <span>{stats.hard} / </span>
            <span className="text-muted">{stats.totalHard}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemProgress;
