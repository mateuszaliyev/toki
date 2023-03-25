import type { HTMLAttributes } from "react";

import { cx } from "@/utilities/cx";

export type ProgressProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | "aria-valuemax"
  | "aria-valuemin"
  | "aria-valuenow"
  | "aria-valuetext"
  | "role"
> & {
  value: number;
};

export const Progress = ({ className, value, ...props }: ProgressProps) => (
  <div
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={value}
    aria-valuetext={`${value}%`}
    className={cx("flex items-center gap-4", className)}
    role="progressbar"
    {...props}
  >
    <div>{value.toFixed(2)}%</div>
    <div className="relative flex w-full items-center">
      <div
        className="h-2 bg-gradient-to-r from-gray-100 to-gray-900 dark:from-gray-900 dark:to-gray-100"
        style={{ width: `${Math.max(Math.min(value, 100), 0)}%` }}
      />
      <div className="h-2 grow bg-gray-300 dark:bg-gray-800" />
    </div>
  </div>
);
