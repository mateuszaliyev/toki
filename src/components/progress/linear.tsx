import { cx } from "@/utilities/cx";
import { clamp, getPercentage } from "@/utilities/number";

import { Progress, type ProgressProps } from "./progress";

export type ProgressLinearProps = ProgressProps;

export const ProgressLinear = ({
  className,
  maximum = 100,
  minimum = 0,
  value,
  ...props
}: ProgressLinearProps) => (
  <Progress
    className={cx("flex items-center gap-4", className)}
    maximum={maximum}
    minimum={minimum}
    value={value}
    {...props}
  >
    <div>{value}%</div>
    <div className="relative flex w-full items-center">
      <div
        className="h-2 bg-gradient-to-r from-gray-100 to-gray-900 dark:from-gray-900 dark:to-gray-100"
        style={{
          width: `${clamp(
            0,
            100 * getPercentage(minimum, maximum, value),
            100
          )}%`,
        }}
      />
      <div className="h-2 grow bg-gray-300 dark:bg-gray-800" />
    </div>
  </Progress>
);
