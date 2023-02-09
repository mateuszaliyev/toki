import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Counter, Figure, Milestone } from "@/types";

import { generateId } from "@/utilities/id";

export type CounterStore = {
  counters: Counter[];
  createCounter: (
    counter: Pick<Counter, "name" | "timestamp"> & {
      figures: Omit<Figure, "id">[];
      milestones: Omit<Milestone, "id">[];
    }
  ) => void;
  deleteCounter: (id: string) => void;
  getCounter: (id?: string) => Counter | undefined;
  importCounters: <Version extends CounterStoreStorageVersion | unknown>(
    storage: CounterStoreStorage<Version>
  ) => void;
  selectCounter: (id: string | null) => void;
  selectedCounter: string | null;
  updateCounter: (
    updatedCounter: Pick<Counter, "id"> &
      Partial<Pick<Counter, "name" | "timestamp">> & {
        figures?: Partial<Figure>[];
        milestones?: Partial<Milestone>[];
      }
  ) => void;
};

export type CounterStoreStorage<
  Version extends CounterStoreStorageVersion | unknown = unknown
> = {
  state: Version extends CounterStoreStorageVersion
    ? CounterStoreStorageState[Version]
    : unknown;
  version: Version;
};

export type CounterStoreStorageState = {
  0: Pick<CounterStore, "counters" | "selectedCounter">;
};

export type CounterStoreStorageVersion = keyof CounterStoreStorageState;

export const COUNTER_STORE_LATEST_VERSION = 0;

const isVersion = (
  storage: CounterStoreStorage,
  version: CounterStoreStorageVersion
): storage is CounterStoreStorage<CounterStoreStorageVersion> =>
  storage.version === version;

export const useCounterStore = create<CounterStore>()(
  persist(
    immer((set, get) => ({
      counters: [
        {
          createdAt: 1675980755810,
          figures: [
            {
              id: "mYvPzLuks0Ia7s26M_smI",
              name: "Godzin",
              quantity: 1,
              unit: "hours",
              value: 1,
            },
            {
              id: "x5euQfyUVpoop8YNon3MP",
              name: "Dni",
              quantity: 1,
              unit: "days",
              value: 1,
            },
          ],
          id: "xcQT0c5EwYB15bettSCFY",
          milestones: [
            {
              id: "QNsxEH0gU5ZLVzA7KNPy5",
              name: "2024",
              timestamp: 1704063600000,
            },
          ],
          name: "2023",
          timestamp: 1672527600000,
          updatedAt: 1675980839092,
        },
      ],
      createCounter: ({ figures, milestones, name, timestamp }) =>
        set((state) => {
          const id = generateId();

          state.counters.push({
            createdAt: Date.now(),
            figures: figures.map((figure) => ({
              ...figure,
              id: generateId(),
            })),
            id,
            milestones: milestones.map((milestone) => ({
              ...milestone,
              id: generateId(),
            })),
            name,
            timestamp,
            updatedAt: Date.now(),
          });

          state.selectedCounter = id;
        }),
      deleteCounter: (id) =>
        set((state) => {
          state.counters = state.counters.filter(
            (counter) => counter.id !== id
          );

          if (state.selectedCounter === id) {
            state.selectedCounter = state.counters.at(-1)?.id ?? null;
          }
        }),
      getCounter: (id) =>
        get().counters.find(
          (counter) => counter.id === (id ?? get().selectedCounter)
        ),
      importCounters: (storage) =>
        set((state) => {
          if (isVersion(storage, 0)) {
            state.counters = storage.state.counters;
            state.selectedCounter = storage.state.selectedCounter;
          }
        }),
      selectCounter: (id) =>
        set((state) => {
          if (id === null) {
            state.selectedCounter = null;
            return;
          }

          if (state.counters.some((counter) => counter.id === id)) {
            state.selectedCounter = id;
          }
        }),
      selectedCounter: "xcQT0c5EwYB15bettSCFY",
      updateCounter: ({ figures, id, milestones, name, timestamp }) =>
        set((state) => {
          const counterIndex = get().counters.findIndex(
            (counter) => counter.id === id
          );

          if (counterIndex === -1) return;

          figures?.forEach((figure) => {
            if (
              !figure.id &&
              figure.name &&
              figure.quantity &&
              figure.unit &&
              figure.value
            ) {
              state.counters[counterIndex].figures.push({
                ...(figure as Omit<Figure, "id">),
                id: generateId(),
              });
              return;
            }

            const figureIndex = state.counters[counterIndex].figures.findIndex(
              ({ id }) => id === figure.id
            );

            if (figureIndex === -1) return;

            if (figure.name)
              state.counters[counterIndex].figures[figureIndex].name =
                figure.name;

            if (figure.quantity)
              state.counters[counterIndex].figures[figureIndex].quantity =
                figure.quantity;

            if (figure.unit)
              state.counters[counterIndex].figures[figureIndex].unit =
                figure.unit;

            if (figure.value)
              state.counters[counterIndex].figures[figureIndex].value =
                figure.value;
          });

          milestones?.forEach((milestone) => {
            if (!milestone.id && milestone.name && milestone.timestamp) {
              state.counters[counterIndex].milestones.push({
                ...(milestone as Omit<Milestone, "id">),
                id: generateId(),
              });

              return;
            }

            const milestoneIndex = state.counters[
              counterIndex
            ].milestones.findIndex(({ id }) => id === milestone.id);

            if (milestoneIndex === -1) return;

            if (milestone.name)
              state.counters[counterIndex].milestones[milestoneIndex].name =
                milestone.name;
            if (milestone.timestamp)
              state.counters[counterIndex].milestones[
                milestoneIndex
              ].timestamp = milestone.timestamp;
          });

          if (name) state.counters[counterIndex].name = name;
          if (timestamp) state.counters[counterIndex].timestamp = timestamp;

          state.counters[counterIndex].updatedAt = Date.now();
        }),
    })),
    {
      name: "toki",
      version: COUNTER_STORE_LATEST_VERSION,
    }
  )
);

export const useCounter = (id?: string) =>
  useCounterStore(({ getCounter }) => getCounter(id));

export const useCounterActions = () =>
  useCounterStore(
    ({
      createCounter,
      deleteCounter,
      getCounter,
      importCounters,
      selectCounter,
      updateCounter,
    }) => ({
      createCounter,
      deleteCounter,
      getCounter,
      importCounters,
      selectCounter,
      updateCounter,
    })
  );

export const useCounters = () => useCounterStore(({ counters }) => counters);
