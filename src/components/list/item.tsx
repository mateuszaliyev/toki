import {
  type LiHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from "react";

import { cva, type VariantProps } from "class-variance-authority";

export type ListItemProps = LiHTMLAttributes<HTMLLIElement> &
  VariantProps<typeof listItem> & {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };

const listItem = cva(
  "relative -mt-px border-gray-300 after:pointer-events-none after:absolute after:-inset-px after:z-list-item after:transition dark:border-gray-800",
  {
    defaultVariants: {
      active: false,
    },
    variants: {
      active: {
        false:
          "after:border-gray-900/0 focus-within:after:border-gray-900 hover:after:border-gray-900 dark:after:border-gray-100/0 dark:focus-within:after:border-gray-100 dark:hover:after:border-gray-100",
        true: "after:border-gray-900 dark:after:border-gray-100",
      },
      borders: {
        all: "border p-5 after:border lg:p-10",
        vertical: "border-y py-5 after:border-y lg:py-10",
      },
    },
  }
);

export const ListItem = ({
  active,
  borders,
  className,
  ...props
}: ListItemProps) => (
  <li className={listItem({ active, borders, className })} {...props} />
);
