import { useState } from "react";

import type { Figure } from "@/types";

import { unitsToMilliseconds } from "@/utilities/units";

import { useInterval } from "./interval";

const getFigure = (figure: Figure, timestamp: number) =>
  (
    ((Date.now() - timestamp) * figure.quantity) /
    (figure.value * unitsToMilliseconds(figure.unit))
  ).toFixed(2);

export const useFigure = (figure: Figure, timestamp: number) => {
  const [value, setValue] = useState(getFigure(figure, timestamp));

  useInterval(() => setValue(getFigure(figure, timestamp)), 1000);

  return value;
};
