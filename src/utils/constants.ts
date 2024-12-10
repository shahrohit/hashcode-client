import {
  Activity,
  Language,
  Problem,
  ProblemList,
  StudyPlan,
} from "@/types/types";

export const LOGO_URL = "/logo.png";
export const BASE_URL = "http://localhost:8080/api";
export const SOCKET_URL = "http://localhost:8080";

export const routes = [
  {
    label: "Problems",
    href: "/problemset",
  },
];

export const problemLists: ProblemList[] = [
  {
    id: 1,
    title: "Two Sum",
    name: "two-sum",
    difficulty: "EASY",
    status: "SOLVED",
    submission: 50,
    acceptance: 48,
  },
  {
    id: 2,
    title: "Add Two Numbers",
    name: "add-two-numbers",
    difficulty: "MEDIUM",
    status: "SOLVED",
    submission: 40,
    acceptance: 18,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    name: "longest-substring-without-repeating-characters",
    difficulty: "MEDIUM",
    status: "ATTEMPTED",
    submission: 38,
    acceptance: 10,
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    name: "median-of-two-sorted-arrays",
    difficulty: "HARD",
    status: "SOLVED",
    submission: 30,
    acceptance: 2,
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    name: "longest-palindromic-substring",
    difficulty: "MEDIUM",
    status: "NOT_ATTEMPTED",
    submission: 34,
    acceptance: 24,
  },
  {
    id: 6,
    title: "Zigzag Conversion",
    name: "zigzag-conversion",
    difficulty: "MEDIUM",
    status: "NOT_ATTEMPTED",
    submission: 55,
    acceptance: 38,
  },
  {
    id: 7,
    title: "Reverse Integer",
    name: "reverse-integer",
    difficulty: "EASY",
    status: "SOLVED",
    submission: 50,
    acceptance: 38,
  },
  {
    id: 8,
    title: "String to Integer",
    name: "string-to-integer",
    difficulty: "MEDIUM",
    status: "SOLVED",
    submission: 55,
    acceptance: 38,
  },
  {
    id: 9,
    title: "Palindrome Number",
    name: "palindrome-number",
    difficulty: "EASY",
    status: "SOLVED",
    submission: 70,
    acceptance: 50,
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    name: "regular-expression-matching",
    difficulty: "HARD",
    status: "NOT_ATTEMPTED",
    submission: 70,
    acceptance: 20,
  },
  {
    id: 11,
    title: "Container With Most Water",
    name: "container-with-most-water",
    difficulty: "MEDIUM",
    status: "SOLVED",
    submission: 80,
    acceptance: 40,
  },
  {
    id: 12,
    title: "Integer to Roman",
    name: "integer-to-roman",
    difficulty: "MEDIUM",
    status: "ATTEMPTED",
    submission: 70,
    acceptance: 30,
  },
  {
    id: 13,
    title: "Roman to Integer",
    name: "roman-to-nteger",
    difficulty: "EASY",
    status: "SOLVED",
    submission: 70,
    acceptance: 35,
  },
  {
    id: 14,
    title: "Longest Common Prefix",
    name: "longest-common-prefix",
    difficulty: "EASY",
    status: "SOLVED",
    submission: 60,
    acceptance: 45,
  },
  {
    id: 15,
    title: "3Sum",
    name: "3sum",
    difficulty: "MEDIUM",
    status: "SOLVED",
    submission: 70,
    acceptance: 50,
  },
  {
    id: 16,
    title: "3Sum Closest",
    name: "3sum-closest",
    difficulty: "MEDIUM",
    status: "NOT_ATTEMPTED",
    submission: 70,
    acceptance: 48,
  },
];

export const studyPlans: StudyPlan[] = [
  {
    id: 1,
    imageUrl: "/algorithm.png", // Replace with actual image URL
    title: "Algorithms Mastery",
    description: "Master all fundamental algorithms",
  },
  {
    id: 2,
    imageUrl: "/top100.png",
    title: "Top Interview 100",
    description: "Ace the coding interview",
  },
  {
    id: 3,
    imageUrl: "/oops.png",
    title: "Java OOPS",
    description: "Learn the essential concepts of OOPs",
  },
  {
    id: 4,
    imageUrl: "/javascript.png",
    title: "Javascript",
    description: "Learn the JS basic",
  },
  {
    id: 5,
    imageUrl: "/python.png",
    title: "Python",
    description: "Learn to code in python",
  },
  {
    id: 6,
    imageUrl: "/sql.png",
    title: "SQL",
    description: "Practice the SQL query",
  },
];

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const activity: Activity = {
  "2024-10-01": { submissions: 3, problemsSolved: 2 },
  "2024-10-05": { submissions: 1, problemsSolved: 1 },
  "2024-10-13": { submissions: 2, problemsSolved: 1 },
  "2024-10-18": { submissions: 1, problemsSolved: 1 },
  // More activity for other months...
};

export const stats = {
  easy: 450,
  medium: 350,
  hard: 150,
  totalEasy: 800,
  totalMedium: 700,
  totalHard: 500,
};

export const languages: { name: string; value: Language }[] = [
  { name: "c++", value: "cpp" },
  { name: "Java", value: "java" },
  { name: "Python", value: "python" },
];

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    name: "two-sum",
    difficulty: "EASY",
    status: "SOLVED",
    submission: 50,
    acceptance: 48,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have _**exactly one solution**_, and you may not use the same element twice.
    
You can return the answer in any order.

&nbsp;

**Example 1:**
- **Input :**  nums = [2, 7, 11, 15], target = 9
- **Output :**  [0, 1]
- **Explanation :** Because nums[0] + nums[1] == 9, we return [0, 1].

&nbsp;

**Example 2:**
- **Input :** nums = [3,2,4], target = 6
- **Output :** [1,2]

&nbsp;

**Constraints :**
- \`2 <= nums.length <= 104\`
- \`-109 <= nums[i] <= 109\`
- \`-109 <= target <= 109\`
- **Only one valid answer exists.**

&nbsp;

**Follow-up :** Can you come up with an algorithm that is less than O(n2) time complexity?

`,
    baseCode: {
      cpp: "class Solution {\npublic:\n\tvector<int> twoSum(vector<int>& nums, int target){\n\n\t}\n};",
      java: "class Solution {\n\tpublic int[] twoSum(int[] nums, int target) {\n\n\t}\n}",
      python:
        "class Solution(object):\n\tdef twoSum(self, nums: List[int], target: int) -> List[int]:\n\t\t",
      javascript:
        "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n\n};",
    },
    topics: ["Array"],
    metaData: {
      parameters: "nums\ntarget",
    },
    testcases: ["[2,7,11,15]\n9", "[3,2,4]\n6", "[3,3]\n6"],
  },
];
