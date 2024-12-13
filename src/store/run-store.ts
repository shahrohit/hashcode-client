import { create } from "zustand";

interface RunState {
  id: string | null;
  setId: (id: string) => void;
  testcases: string[];
  setTestcases: (testcase: string[]) => void;
}

const useRunStore = create<RunState>((set) => ({
  id: null,
  setId: (id) => set({ id: id }),
  testcases: [],
  setTestcases: (testcase: string[]) => set({ testcases: testcase }),
}));

export default useRunStore;
