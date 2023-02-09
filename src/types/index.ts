import type { Duration } from "date-fns";

export type Counter = {
  createdAt: number;
  figures: Figure[];
  id: string;
  milestones: Milestone[];
  name: string;
  timestamp: number;
  updatedAt: number;
};

export type Figure = {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
  value: number;
};

export type Milestone = {
  id: string;
  name: string;
  timestamp: number;
};

export type Unit = Exclude<keyof Duration, "weeks">;
