import { useState } from "react";

import { Progress, type ProgressProps } from "@/components/progress";

import { useInterval } from "@/hooks/interval";

import type { Milestone as MilestoneType } from "@/types";

import { cx } from "@/utilities/cx";

export type MilestoneProps = Omit<ProgressProps, "value"> & {
  milestone: MilestoneType;
  timestamp: number;
};

const getProgress = (from: number, to: number, value: number) =>
  from === to ? 0 : (value - from) / (to - from);

export const MilestoneProgress = ({
  className,
  milestone,
  timestamp,
  ...props
}: MilestoneProps) => {
  const [progress, setProgress] = useState(
    Math.max(
      Math.min(
        100 * getProgress(timestamp, milestone.timestamp, Date.now()),
        100
      ),
      0
    )
  );

  useInterval(
    () =>
      setProgress(
        Math.max(
          Math.min(
            100 * getProgress(timestamp, milestone.timestamp, Date.now()),
            100
          ),
          0
        )
      ),
    1000
  );

  return (
    <Progress
      className={cx("flex-grow", className)}
      value={progress}
      {...props}
    />
  );
};
