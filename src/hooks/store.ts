import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Store = {
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
  setView: (view: View) => void;
  view: View;
};

export type View = "create" | "counter" | "edit" | "list";

export const useStore = create<Store>()(
  immer((set) => ({
    headerHeight: 160,
    setHeaderHeight: (height) =>
      set((state) => {
        state.headerHeight = height;
      }),
    setView: (view) =>
      set((state) => {
        state.view = view;
      }),
    view: "counter",
  }))
);

export const useHeaderHeight = () =>
  useStore(({ headerHeight, setHeaderHeight }) => ({
    headerHeight,
    setHeaderHeight,
  }));

export const useView = () =>
  useStore(({ setView, view }) => ({ setView, view }));
