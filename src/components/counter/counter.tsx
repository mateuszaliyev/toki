import type { TimeHTMLAttributes } from "react";

import { useDuration } from "@/hooks/duration";

import { dateFormatters, POLISH_LOCALE } from "@/i18n/polish";

import type { Unit } from "@/types";

import { cx } from "@/utilities/cx";

import { CounterSegment, type CounterSegmentProps } from "./segment";

export type CounterProps = TimeHTMLAttributes<HTMLTimeElement> & {
  bordered?: CounterSegmentProps["bordered"];
  size?: CounterSegmentProps["size"];
  timestamp: number;
};

export const Counter = ({
  bordered,
  className,
  size,
  timestamp,
  ...props
}: CounterProps) => {
  const duration = useDuration(timestamp);

  return (
    <time
      className={cx("flex items-center justify-center gap-4", className)}
      {...props}
    >
      {Object.entries(duration).map(([key, value]) => (
        <CounterSegment
          bordered={bordered}
          key={key}
          size={size}
          unit={dateFormatters[key as Unit](value).toLocaleLowerCase(
            POLISH_LOCALE
          )}
        >
          {value}
        </CounterSegment>
      ))}
    </time>
  );
};
