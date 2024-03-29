import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cva } from "class-variance-authority";

export type HeaderButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  borders?: boolean;
  selected?: boolean;
};

const button = cva(
  "relative -ml-px border-x font-semibold outline-none transition before:absolute before:bottom-0 before:left-0 before:right-0 before:h-full before:origin-bottom before:bg-gray-900 before:transition after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:translate-y-px after:bg-gray-300 after:transition first:ml-0 hover:after:bg-gray-900 focus-visible:after:bg-gray-900 dark:before:bg-gray-100 dark:after:bg-gray-800 dark:hover:after:bg-gray-100 dark:focus-visible:after:bg-gray-100",
  {
    defaultVariants: {
      borders: true,
      selected: false,
    },
    variants: {
      borders: {
        false: "border-gray-300/0 dark:border-gray-800/0",
        true: "border-gray-300 dark:border-gray-800",
      },
      selected: {
        false: "before:scale-y-0",
        true: "text-gray-100 before:scale-y-100 dark:text-gray-900",
      },
    },
  }
);

export const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(
  ({ borders, children, className, selected, ...props }, ref) => (
    <button
      className={button({ borders, className, selected })}
      ref={ref}
      {...props}
    >
      <span className="relative">{children}</span>
    </button>
  )
);
