"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DoughnutChartProps {
  easy: number;
  medium: number;
  hard: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

const ProgressChart = ({
  easy,
  medium,
  hard,
  totalEasy,
  totalMedium,
  totalHard,
}: DoughnutChartProps) => {
  const totalSolved = easy + medium + hard;
  const totalProblems = totalEasy + totalMedium + totalHard;

  const remaining = totalProblems - totalSolved;

  // Data for the chart (solved and remaining)
  const data = [
    { name: "Easy", value: easy },
    { name: "Medium", value: medium },
    { name: "Hard", value: hard },
    { name: "Remaining", value: remaining },
  ];

  // Colors for solved and remaining (lighter shade for remaining)
  const COLORS = [
    "#16a34a", // Easy Solved (green)
    "hsl(var(--medium))", // Medium Solved (yellow)
    "#dc2626", // Hard Solved (red)
    "hsl(var(--secondary))", // Hard Remaining (light red)
  ];

  return (
    <div className="relative w-full h-36">
      {/* Total solved problems shown in the center of the chart */}
      <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-base  pointer-events-none">
        <span className="">{totalSolved}</span>
        <span className="border-t-2 border-foreground">{totalProblems}</span>
      </div>

      {/* Responsive container for the ring chart */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="70%" // Creates the ring shape
            outerRadius="90%"
            paddingAngle={5}
            dataKey="value"
            startAngle={90}
            endAngle={-270} // Full circle reversed to clockwise
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              padding: "5px",
              fontSize: "14px",
              fontWeight: 700,
            }}
            formatter={(value: number, name: string) => [
              `${name} : ${value} solved`,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
