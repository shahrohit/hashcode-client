import { studyPlans } from "@/utils/constants";
import Image from "next/image";
import { Button } from "../ui/button";

const StudyPlan = () => {
  return (
    <section className="">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold">Study Plans</h2>
        <Button variant="primary">See More</Button>
      </div>

      {/* Study Plan List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2">
        {studyPlans.map((plan) => (
          <div
            key={plan.id}
            className="flex items-center gap-4 h-24 px-2 bg-secondary rounded-md"
          >
            {/* Image */}
            <div className="relative h-20 w-20">
              <Image
                src={plan.imageUrl}
                alt={plan.title}
                className=" object-contain"
                height={80}
                width={80}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-semibold">{plan.title}</h3>
              <p className="text-muted-foreground text-xs">
                {plan.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyPlan;
