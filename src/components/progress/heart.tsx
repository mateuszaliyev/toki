import { useId, useMemo } from "react";

import { useResizeObserver } from "@/hooks/resize-observer";

import { cx } from "@/utilities/cx";
import { getPercentage } from "@/utilities/number";

import { Progress, type ProgressProps } from "./progress";

export type ProgressHeartProps = ProgressProps;
export type ProgressHeartIconProps = Pick<ProgressHeartProps, "value">;

const ProgressHeartIcon = ({ value }: ProgressHeartIconProps) => {
  const id = useId();

  return (
    <svg
      className="h-6 w-6"
      fill={
        value === 0
          ? "transparent"
          : value === 1
          ? "currentColor"
          : `url(#${id})`
      }
      stroke="currentColor"
      strokeWidth="1"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      {value && (
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset={`${100 * value}%`} stopColor="currentColor" />
            <stop offset={`${100.001 * value}%`} stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path d="M14.88 4.78079C14.7993 4.46498 14.6748 4.16202 14.51 3.88077C14.3518 3.58819 14.1493 3.3217 13.91 3.09073C13.563 2.74486 13.152 2.46982 12.7 2.28079C11.7902 1.90738 10.7698 1.90738 9.85999 2.28079C9.43276 2.46163 9.04027 2.71541 8.70002 3.03079L8.65003 3.09073L8.00001 3.74075L7.34999 3.09073L7.3 3.03079C6.95975 2.71541 6.56726 2.46163 6.14002 2.28079C5.23018 1.90738 4.20984 1.90738 3.3 2.28079C2.84798 2.46982 2.43706 2.74486 2.09004 3.09073C1.85051 3.32402 1.64514 3.59002 1.48002 3.88077C1.32258 4.1644 1.20161 4.46682 1.12 4.78079C1.03522 5.10721 0.994861 5.44358 1.00001 5.78079C1.00053 6.09791 1.04084 6.41365 1.12 6.72073C1.20384 7.03078 1.32472 7.32961 1.48002 7.61075C1.64774 7.89975 1.85285 8.16542 2.09004 8.40079L8.00001 14.3108L13.91 8.40079C14.1471 8.16782 14.3492 7.90169 14.51 7.61075C14.6729 7.33211 14.7974 7.03272 14.88 6.72073C14.9592 6.41365 14.9995 6.09791 15 5.78079C15.0052 5.44358 14.9648 5.10721 14.88 4.78079Z"></path>
    </svg>
  );
};

export const ProgressHeart = ({
  className,
  maximum = 100,
  minimum = 0,
  value,
  ...props
}: ProgressHeartProps) => {
  const [ref, entry] = useResizeObserver<HTMLDivElement>();

  const hearts = useMemo(() => {
    if (!entry?.contentRect.width) return [];

    const length = Math.floor(entry.contentRect.width / 24);

    return Array.from({ length }, (_, index) => {
      const start = minimum + (index * (maximum - minimum)) / length;
      const end = minimum + ((index + 1) * (maximum - minimum)) / length;

      return value < start
        ? 0
        : end < value
        ? 1
        : getPercentage(start, end, value);
    });
  }, [entry?.contentRect.width, maximum, minimum, value]);

  return (
    <Progress
      className={cx("flex items-center gap-4", className)}
      maximum={maximum}
      minimum={minimum}
      value={value}
      {...props}
    >
      <div>{value}%</div>
      <div className="flex grow justify-center overflow-x-hidden" ref={ref}>
        {hearts.map((value, index) => (
          <ProgressHeartIcon key={index} value={value} />
        ))}
      </div>
    </Progress>
  );
};
