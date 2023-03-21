import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Store = {
  setView: (view: View) => void;
  view: View;
};

export type View = "create" | "counter" | "edit" | "list";

export const useStore = create<Store>()(
  immer((set) => ({
    setView: (view) =>
      set((state) => {
        state.view = view;
      }),
    view: "counter",
  }))
);

export const useView = () =>
  useStore(({ setView, view }) => ({ setView, view }));
