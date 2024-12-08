import { ProblemContainer } from "@/components/problem/problem-container";
import ProblemHeader from "@/components/problem/problem-header";

type Props = {
  params: { id: string };
};

const ProblemPage = async ({ params }: Props) => {
  return (
    <>
      <div className="h-16 fixed top-0 left-0 w-full bg-background z-40">
        <ProblemHeader />
      </div>
      <section className="pt-16 pb-2 px-2">
        <ProblemContainer slug={params.id} />
      </section>
    </>
  );
};

export default ProblemPage;
