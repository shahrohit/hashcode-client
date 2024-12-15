import ProblemSetContainer from "@/components/problemset/problemset-container";

const PracticeSetPage = () => {
  return (
    <main className="w-full">
      <div className="w-full xl:w-[95%] xl:mx-auto flex flex-col lg:flex-row gap-5 py-5">
        <section className="h-full w-full p-1">
          <ProblemSetContainer />
        </section>
        {/* TODO: USER STATS */}
        {/* <section className="w-full lg:w-[30%] p-1">
          <UserStatContainer />
        </section> */}
      </div>
    </main>
  );
};

export default PracticeSetPage;
