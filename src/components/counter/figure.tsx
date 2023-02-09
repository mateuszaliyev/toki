import { useFigure } from "@/hooks/figure";

import type { Figure as FigureType } from "@/types";

export type FigureProps = {
  figure: FigureType;
  timestamp: number;
};
export const Figure = ({ figure, timestamp }: FigureProps) => {
  const value = useFigure(figure, timestamp);

  return <>{value}</>;
};
