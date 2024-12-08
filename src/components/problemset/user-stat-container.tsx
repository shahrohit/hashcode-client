import CalenderView from "./calender-view";
import ProblemProgress from "./problem-progress";

const UserStatContainer = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <CalenderView />
      <ProblemProgress />
    </div>
  );
};

export default UserStatContainer;
