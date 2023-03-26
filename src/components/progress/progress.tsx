import type { HTMLAttributes } from "react";

export type ProgressProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "aria-valuemax"
  | "aria-valuemin"
  | "aria-valuenow"
  | "aria-valuetext"
  | "role"
> & {
  maximum?: number;
  minimum?: number;
  text?: string;
  value: number;
};

export const Progress = ({
  maximum = 100,
  minimum = 0,
  text,
  value,
  ...props
}: ProgressProps) => (
  <div
    aria-valuemax={maximum}
    aria-valuemin={minimum}
    aria-valuenow={value}
    aria-valuetext={text ?? `${value}%`}
    role="progressbar"
    {...props}
  />
);
