import type { Unit } from "@/types";

const DAYS_IN_A_YEAR = 365.2425;

export const UNITS = [
  "days",
  "hours",
  "minutes",
  "months",
  "seconds",
  "years",
] as const satisfies readonly Unit[];

const unitsConversionTable: Record<Unit, number> = {
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
  months: (1000 * 60 * 60 * 24 * DAYS_IN_A_YEAR) / 12,
  seconds: 1000,
  years: 1000 * 60 * 60 * 24 * DAYS_IN_A_YEAR,
};

export const unitsToMilliseconds = (unit: Unit) => unitsConversionTable[unit];
