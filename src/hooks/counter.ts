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
  getMilestones: (
    status: CounterStoreMilestoneStatus,
    id?: string
  ) => Milestone[];
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

export type CounterStoreMilestoneStatus = "completed" | "pending";

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
          createdAt: Date.now(),
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
              name: `${new Date().getFullYear() + 1}`,
              timestamp: new Date(
                `${new Date().getFullYear() + 1}-01-01`
              ).getTime(),
            },
          ],
          name: `${new Date().getFullYear()}`,
          timestamp: new Date(`${new Date().getFullYear()}-01-01`).getTime(),
          updatedAt: Date.now(),
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
      getMilestones: (status, id) => {
        const counter = get().getCounter(id);

        if (!counter) return [];

        if (status === "completed") {
          return counter.milestones.filter(
            ({ timestamp }) => timestamp < Date.now()
          );
        }

        return counter?.milestones
          .filter(({ timestamp }) => timestamp > Date.now())
          .sort((a, z) => (a.timestamp < z.timestamp ? -1 : 1));
      },
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

          if (figures) {
            state.counters[counterIndex].figures = state.counters[
              counterIndex
            ].figures.filter((figure) =>
              figures.some(({ id }) => id === figure.id)
            );

            figures.forEach((figure) => {
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

              const figureIndex = state.counters[
                counterIndex
              ].figures.findIndex(({ id }) => id === figure.id);

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
          }

          if (milestones) {
            state.counters[counterIndex].milestones = state.counters[
              counterIndex
            ].milestones.filter((milestone) =>
              milestones?.some(({ id }) => id === milestone.id)
            );

            milestones.forEach((milestone) => {
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
          }

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
  useCounterStore(({ getCounter, getMilestones }) => {
    const counter = getCounter(id);

    if (!counter) return;

    return {
      ...counter,
      getMilestones: (status: CounterStoreMilestoneStatus) =>
        getMilestones(status, id),
    };
  });

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
