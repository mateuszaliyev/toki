import type { HTMLAttributes, ReactNode } from "react";

import { cva, VariantProps } from "class-variance-authority";

export type CounterSegmentProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof counterSegment> & {
    children: ReactNode;
    unit: string;
  };

const counterSegment = cva(
  "flex h-40 w-40 flex-col items-center justify-center",
  {
    defaultVariants: {
      bordered: false,
    },
    variants: {
      bordered: {
        true: "border border-gray-300 dark:border-gray-800",
      },
    },
  }
);

export const CounterSegment = ({
  bordered,
  children,
  className,
  unit,
}: CounterSegmentProps) => (
  <span className={counterSegment({ bordered, className })}>
    <span>{children}</span>
    <span className="bottom-2 text-2xl text-gray-400 dark:text-gray-600">
      {unit}
    </span>
  </span>
);
