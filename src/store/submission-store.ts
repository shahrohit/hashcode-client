import { create } from "zustand";

interface SubmissionState {
  id: string | null;
  setId: (id: string) => void;
  problemSlug: string | null;
  setProblemSlug: (slug: string) => void;
  language: string | null;
  setLanguage: (lang: string) => void;
  code: string | null;
  setCode: (code: string) => void;
}

const useSubmissionStore = create<SubmissionState>((set) => ({
  problemSlug: null,
  id: null,
  setProblemSlug: (slug) => set({ problemSlug: slug }),
  setId: (id) => set({ id: id }),
  language: null,
  setLanguage: (lang) => set({ language: lang }),
  code: null,
  setCode: (code) => set({ code }),
}));

export default useSubmissionStore;
