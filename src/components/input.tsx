import { forwardRef, type InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

import { cx } from "@/utilities/cx";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  icon?: IconType;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon: Icon, ...props }, ref) => (
    <div>
      <div
        className={cx(
          "group flex h-16 cursor-text gap-2 border-b transition",
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-gray-900 dark:border-gray-800 dark:focus-within:border-gray-100"
        )}
      >
        {Icon && (
          <div className="flex flex-shrink flex-col justify-center">
            <Icon className="h-5 w-5 text-gray-400 transition group-hover:text-gray-900 dark:text-gray-600 dark:group-hover:text-gray-100" />
          </div>
        )}
        <input
          className={cx(
            "grow bg-transparent pr-2 text-gray-900 outline-none transition placeholder:text-gray-400 placeholder:transition group-hover:placeholder:text-gray-900 dark:text-gray-100 dark:placeholder:text-gray-600 dark:group-hover:placeholder:text-gray-100",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      <span className="flex h-5 dark:text-red-500">{error}</span>
    </div>
  )
);
