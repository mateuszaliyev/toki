import { useState } from "react";

import { useTheme } from "next-themes";

import { ProgressHeart } from "@/components/progress/heart";
import {
  ProgressLinear,
  type ProgressLinearProps,
} from "@/components/progress/linear";

import { useInterval } from "@/hooks/interval";

import type { Milestone as MilestoneType } from "@/types";

import { clamp, getPercentage, toFixed } from "@/utilities/number";

export type MilestoneProps = Omit<ProgressLinearProps, "value"> & {
  milestone: MilestoneType;
  timestamp: number;
};

const getProgress = (...parameters: Parameters<typeof getPercentage>) =>
  toFixed(clamp(0, 100 * getPercentage(...parameters), 100), 2);

export const MilestoneProgress = ({
  milestone,
  timestamp,
  ...props
}: MilestoneProps) => {
  const [progress, setProgress] = useState(
    getProgress(timestamp, milestone.timestamp, Date.now())
  );

  const { theme } = useTheme();

  useInterval(
    () => setProgress(getProgress(timestamp, milestone.timestamp, Date.now())),
    1000
  );

  return theme === "pink" ? (
    <ProgressHeart value={progress} {...props} />
  ) : (
    <ProgressLinear value={progress} {...props} />
  );
};
