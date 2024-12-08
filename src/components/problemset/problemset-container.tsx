import ProblemSet from "./problem-set";
import Topics from "./topics";

const ProblemSetContainer = () => {
  return (
    <div className="w-full h-full">
      {/* TODO - study Plan */}
      {/* <div>
        <StudyPlan />
      </div> */}
      <div className="w-full h-full pt-10">
        <Topics />
      </div>
      <div className="h-full">
        <ProblemSet />
      </div>
    </div>
  );
};

export default ProblemSetContainer;
