import type { ButtonHTMLAttributes } from "react";

import { cx } from "@/utilities/cx";

export type MenuItemProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const MenuItem = ({ className, ...props }: MenuItemProps) => (
  <button
    className={cx(
      "block h-8 transition hover:text-gray-900 focus-visible:text-gray-900 dark:hover:text-gray-100 dark:focus-visible:text-gray-100",
      className
    )}
    {...props}
  />
);
