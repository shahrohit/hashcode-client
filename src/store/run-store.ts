import { create } from "zustand";

interface RunState {
  id: string | null;
  slug: string | null;
  setId: (slug: string) => void;
  setSlug: (slug: string) => void;
  testcases: string[];
  setTestcases: (testcase: string[]) => void;
}

const useRunStore = create<RunState>((set) => ({
  id: null,
  slug: null,
  setId: (id) => set({ id: id }),
  setSlug: (slug) => set({ slug: slug }),
  testcases: [],
  setTestcases: (testcase: string[]) => set({ testcases: testcase }),
}));

export default useRunStore;
