import { Fragment, type ReactNode } from "react";
import { IoTriangleSharp } from "react-icons/io5";

import { Menu as HeadlessUiMenu, Transition } from "@headlessui/react";

import { cx } from "@/utilities/cx";

export type MenuProps = {
  children: ReactNode;
  className?: string;
  text: string;
};

export const Menu = ({ children, className, text }: MenuProps) => (
  <HeadlessUiMenu as="div" className={cx("relative", className)}>
    <HeadlessUiMenu.Button
      className={({ open }) =>
        cx(
          "relative flex items-center gap-2 outline-none transition hover:text-gray-900 dark:hover:text-gray-100",
          open
            ? "z-select-button text-gray-900 dark:text-gray-100"
            : "z-select-button-inactive text-gray-400 dark:text-gray-600"
        )
      }
    >
      {({ open }) => (
        <>
          {text}
          <IoTriangleSharp
            className={cx(
              "h-2 w-2 transition-transform",
              open ? "-rotate-180" : "-rotate-90"
            )}
          />
        </>
      )}
    </HeadlessUiMenu.Button>
    <Transition
      as={Fragment}
      enter="transition duration-150 ease-in-out"
      enterFrom="scale-95 opacity-0"
      enterTo="scale-100 opacity-100"
      leave="transition duration-150 ease-in-out"
      leaveFrom="scale-100 opacity-100"
      leaveTo="scale-95 opacity-0"
    >
      <HeadlessUiMenu.Items className="absolute -top-5 -left-6 z-select-options border border-gray-300 bg-gray-100/80 p-6 pt-16 text-gray-400 outline-none backdrop-blur dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-600">
        {children}
      </HeadlessUiMenu.Items>
    </Transition>
  </HeadlessUiMenu>
);
