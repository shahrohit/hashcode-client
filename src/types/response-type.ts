export type AuthUser = {
  username: string;
  accessToken: string;
};

export type TopicWithCount = {
  name: string;
  slug: string;
  count: number;
};

export type Topic = {
  name: string;
  slug: string;
};

export type Difficulty = "Basic" | "Easy" | "Medium" | "Hard";

export type ProblemView = {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
};

export type Problem = {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  description: string;
  count: number;
  topics: Topic[];
  sampleTestcases: string[];
  parameterName: string;
};

export type Testcase = {
  sampleTestcases: string[];
  parameterName: string;
};

export type Language = {
  name: string;
  lang: string;
};
