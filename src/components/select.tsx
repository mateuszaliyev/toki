import { Fragment, HTMLAttributes } from "react";
import type { IconType } from "react-icons";
import { IoTriangleSharp } from "react-icons/io5";

import { Listbox, Transition } from "@headlessui/react";

import { cx } from "@/utilities/cx";

export type SelectOption = {
  name: string;
  value: number | string;
};

export type SelectProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  disabled?: boolean;
  error?: string;
  icon?: IconType;
  onChange?: (option: SelectOption) => void;
  options: SelectOption[];
  value: SelectOption;
};

export const Select = ({
  className,
  disabled,
  error,
  icon: Icon,
  onChange,
  options,
  value,
  ...props
}: SelectProps) => (
  <Listbox disabled={disabled} onChange={onChange} value={value}>
    <div className={cx("group relative flex", className)} {...props}>
      <Listbox.Button
        className={cx(
          "relative h-16 w-full border-b outline-none transition",
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-gray-900 dark:border-gray-800 dark:focus-within:border-gray-100",
          className
        )}
      >
        {({ open }) => (
          <span
            className={cx(
              "relative flex items-center gap-2",
              open ? "z-select-button" : "z-select-button-inactive"
            )}
          >
            {Icon && (
              <Icon
                className={cx(
                  "h-5 w-5 transition",
                  open
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-400 group-hover:text-gray-900 dark:text-gray-600 dark:group-hover:text-gray-100"
                )}
              />
            )}
            {value.name}
            {value.name && (
              <IoTriangleSharp
                className={cx(
                  "ml-2 h-2 w-2 transition",
                  open ? "-rotate-180" : "-rotate-90"
                )}
              />
            )}
          </span>
        )}
      </Listbox.Button>
      <Transition
        as={Fragment}
        enter="transition"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute top-0 -left-6 z-select-options min-w-[16rem] border border-gray-300 bg-gray-100 p-6 pt-16 outline-none dark:border-gray-800 dark:bg-gray-900">
          {options.map((option) => (
            <Listbox.Option
              className="h-8 cursor-pointer"
              key={option.value}
              value={option}
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </div>
  </Listbox>
);
