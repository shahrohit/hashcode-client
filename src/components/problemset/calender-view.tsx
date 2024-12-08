"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"; // Adjust based on your project structure
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { activity, weekDays } from "@/utils/constants";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const Calendar = () => {
  const today = dayjs(); // Current day and time
  const currentYear = today.year(); // Get the current year

  const [selectedMonth, setSelectedMonth] = useState(today.month()); // Track selected month (0 = January, 11 = December)

  const handlePrevMonth = () => {
    if (selectedMonth > 0) {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    const month = today.month();
    if (selectedMonth < month) {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const daysInMonth = dayjs()
    .year(currentYear)
    .month(selectedMonth)
    .daysInMonth(); // Days in selected month
  const firstDayOfMonth = dayjs()
    .year(currentYear)
    .month(selectedMonth)
    .startOf("month")
    .day(); // First day of the month

  const renderDayTile = (day: number) => {
    const dateKey = dayjs().year(currentYear).month(selectedMonth).date(day);

    const formattedDateKey = dateKey.format("YYYY-MM-DD");
    const isUpcoming = dayjs().isBefore(dayjs(dateKey)); // Check if date is in the future
    const isActive = !!activity[formattedDateKey];
    const isToday = dateKey.isSame(today, "day");

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`size-10 aspect-square flex items-center text-base font-semibold justify-center rounded-lg ${
                isActive ? "" : ""
              } ${
                isUpcoming ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              {isActive ? (
                <CheckCheck className="text-green-600 " />
              ) : (
                <span
                  className={cn(
                    isToday &&
                      "bg-foreground  text-background font-bold  rounded-full w-full h-full text-center py-2"
                  )}
                >
                  {day}
                </span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent
            className={cn("bg-secondary", isUpcoming && "hidden")}
          >
            {isActive
              ? `Submissions: ${activity[formattedDateKey].submissions}, Solved: ${activity[formattedDateKey].problemsSolved}`
              : "No Activity"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="border p-2 rounded-md w-full sm:max-w-[350px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold px-1">
          {dayjs().month(selectedMonth).format("MMMM")} {currentYear}
        </h2>
        <section className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={handlePrevMonth}
            className={`size-7 p-1.5`}
            disabled={selectedMonth === 0}
          >
            <HiOutlineChevronLeft strokeWidth={2.5} />
          </Button>
          <Button
            variant="secondary"
            onClick={handleNextMonth}
            className={`size-7 p-1.5`}
            disabled={selectedMonth === today.month()}
          >
            <HiOutlineChevronRight strokeWidth={2.5} />
          </Button>
        </section>
      </div>

      {/* Calendar Grid */}
      <section className="grid grid-cols-7 gap-2">
        {weekDays?.map((weekDay, index) => {
          return (
            <div
              key={index}
              className="size-10 aspect-square font-semibold flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}

        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, idx) => (
            <div
              key={idx}
              className="size-10 aspect-square flex items-center justify-cente"
            ></div>
          ))}

        {/* Render each day of the selected month */}
        {Array(daysInMonth)
          .fill(null)
          .map((_, idx) => (
            <div key={idx}>{renderDayTile(idx + 1)}</div>
          ))}
      </section>
    </div>
  );
};

export default Calendar;
