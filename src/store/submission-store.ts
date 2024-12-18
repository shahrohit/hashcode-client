import { create } from "zustand";

interface SubmissionState {
  socketKey: string | null;
  setSocketKey: (id: string) => void;
  problemSlug: string | null;
  problemId: number | null;
  setProblemSlug: (slug: string) => void;
  setProblemId: (id: number) => void;
  language: string | null;
  setLanguage: (lang: string) => void;
  code: string | null;
  setCode: (code: string) => void;
}

const useSubmissionStore = create<SubmissionState>((set) => ({
  problemSlug: null,
  problemId: null,
  socketKey: null,
  setProblemSlug: (slug) => set({ problemSlug: slug }),
  setProblemId: (id) => set({ problemId: id }),
  setSocketKey: (socketKey) => set({ socketKey: socketKey }),
  language: null,
  setLanguage: (lang) => set({ language: lang }),
  code: null,
  setCode: (code) => set({ code }),
}));

export default useSubmissionStore;
