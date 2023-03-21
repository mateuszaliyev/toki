import { Fragment } from "react";

import { useTheme } from "next-themes";

import { Popover, Transition } from "@headlessui/react";

import { HeaderButton } from "@/components/header/button";

import { useView } from "@/hooks/store";

import { formatTheme } from "@/i18n/polish";

const navigationButton =
  "outline-none transition hover:text-gray-900 focus-visible:text-gray-900 dark:hover:text-gray-100 dark:focus-visible:text-gray-100";

export const Navigation = () => {
  const { setView } = useView();
  const { setTheme, theme } = useTheme();

  return (
    <Popover as={Fragment}>
      <Popover.Button as={Fragment}>
        {({ open }) => (
          <HeaderButton
            borders
            className="flex aspect-square items-center justify-center border-r-0"
            selected={open}
          >
            <span className="sr-only">{open ? "Zamknij" : "Otwórz"} menu</span>
            <svg
              className="h-6 w-6 lg:h-12 lg:w-12"
              fill="currentColor"
              viewBox="0 0 53 16"
            >
              <path d="M0 3h53V0H0zM0 16h53v-3H0z" />
            </svg>
          </HeaderButton>
        )}
      </Popover.Button>
      <Transition
        enter="transition duration-150 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-150 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Overlay className="fixed bottom-0 left-0 right-0 top-16 z-navigation bg-gray-100/80 backdrop-blur dark:bg-gray-900/50 lg:top-32" />
        <Popover.Panel
          as="nav"
          className="fixed bottom-0 left-0 right-0 top-16 z-navigation px-16 text-right text-2xl font-semibold text-gray-400 dark:text-gray-600 lg:top-32 lg:pr-32 lg:text-5xl"
        >
          <ul className="flex flex-col gap-8 pt-16 lg:pt-32">
            <li>
              <Popover.Button
                className={navigationButton}
                onClick={() => setView("counter")}
              >
                Licznik
              </Popover.Button>
            </li>
            <li>
              <Popover.Button
                className={navigationButton}
                onClick={() => setView("list")}
              >
                Lista
              </Popover.Button>
            </li>
            <li>
              <Popover.Button
                className={navigationButton}
                onClick={() => setView("create")}
              >
                Nowy
              </Popover.Button>
            </li>
          </ul>
          <ul className="mt-8 flex flex-col gap-8 border-t border-gray-300 pt-8 dark:border-gray-800">
            <li>
              <button
                className={navigationButton}
                onClick={() =>
                  setTheme(
                    theme === "dark"
                      ? "light"
                      : theme === "light"
                      ? "pink"
                      : theme === "pink"
                      ? "system"
                      : "dark"
                  )
                }
              >
                {formatTheme(theme)} motyw
              </button>
            </li>
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
