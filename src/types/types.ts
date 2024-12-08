export type Difficulty = "Easy" | "Medium" | "Hard";

export type ProblemStatus = "SOLVED" | "ATTEMPTED" | "NOT_ATTEMPTED";
export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD";

export type Language = "cpp" | "java" | "python";

export type Testcase = string[];
export type ProblemMetaData = {
  parameters: string;
};
export interface ProblemList {
  id: number;
  title: string;
  name: string;
  status: ProblemStatus;
  difficulty: ProblemDifficulty;
  submission: number;
  acceptance: number;
}

export interface Problem extends ProblemList {
  description: string;
  topics: string[];
  hints?: string[];
  baseCode: {
    [language: string]: string;
  };
  metaData: ProblemMetaData;
  testcases: Testcase;
}

export type StudyPlan = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
};

export type Activity = {
  [date: string]: {
    problemsSolved: number;
    submissions: number;
  };
};