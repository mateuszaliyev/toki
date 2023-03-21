import type { HTMLAttributes, ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cx } from "@/utilities/cx";

export type CounterSegmentProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof counterSegment> & {
    children: ReactNode;
    unit: string;
  };

const counterSegment = cva("flex flex-col items-center justify-center", {
  defaultVariants: {
    bordered: false,
  },
  variants: {
    bordered: {
      true: "border border-gray-300 dark:border-gray-800",
    },
    size: {
      large: "text-7xl h-40 w-40",
      small: "text-4xl h-20 w-20",
    },
  },
});

export const CounterSegment = ({
  bordered,
  children,
  className,
  size = "large",
  unit,
}: CounterSegmentProps) => (
  <span className={counterSegment({ bordered, className, size })}>
    <span>{children}</span>
    <span
      className={cx(
        "bottom-2 text-2xl text-gray-400 dark:text-gray-600",
        size === "large" ? "text-2xl" : "text-lg"
      )}
    >
      {unit}
    </span>
  </span>
);
