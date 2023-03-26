import { type ButtonHTMLAttributes, forwardRef } from "react";
import type { IconType } from "react-icons";

import { cva, type VariantProps } from "class-variance-authority";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<VariantProps<typeof button>, "disabled"> & {
    icon?: IconType;
  };

const button = cva("flex items-center gap-2 outline-none transition", {
  compoundVariants: [
    {
      className:
        "text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-400",
      disabled: false,
      variant: "primary",
    },
    {
      className:
        "text-gray-400 hover:text-gray-900 focus-visible:text-gray-900 dark:text-gray-600 dark:hover:text-gray-100 dark:focus-visible:text-gray-100",
      disabled: false,
      variant: "secondary",
    },
  ],
  defaultVariants: {
    disabled: false,
  },
  variants: {
    disabled: {
      true: "cursor-not-allowed text-gray-600 dark:text-gray-400",
    },
    variant: {
      primary: "",
      secondary: "",
    },
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, icon: Icon, variant, ...props }, ref) => (
    <button
      className={button({ className, disabled, variant })}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </button>
  )
);
