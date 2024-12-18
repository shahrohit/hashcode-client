import { create } from "zustand";

interface RunState {
  socketKey: string | null;
  slug: string | null;
  testcases: string[];
  setSocketKey: (id: string) => void;
  setSlug: (slug: string) => void;
  setTestcases: (testcase: string[]) => void;
}

const useRunStore = create<RunState>((set) => ({
  socketKey: null,
  slug: null,
  testcases: [],
  setSocketKey: (socketKey) => set({ socketKey: socketKey }),
  setSlug: (slug) => set({ slug: slug }),
  setTestcases: (testcase: string[]) => set({ testcases: testcase }),
}));

export default useRunStore;
