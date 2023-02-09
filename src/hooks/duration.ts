import { useState } from "react";

import { intervalToDuration } from "date-fns";

import { useInterval } from "./interval";

const intervalToNowToDuration = (value: Date | number | string) => {
  const date = new Date(value);
  const now = new Date();

  return intervalToDuration({
    end: date < now ? now : date,
    start: date < now ? date : now,
  });
};

export const useDuration = (date: Date | number | string) => {
  const [duration, setDuration] = useState(intervalToNowToDuration(date));

  useInterval(() => setDuration(intervalToNowToDuration(date)), 1000);

  return duration;
};
