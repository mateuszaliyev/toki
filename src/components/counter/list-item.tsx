import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";

import { Button } from "@/components/button";
import { ListItem, type ListItemProps } from "@/components/list/item";
import { Menu } from "@/components/menu";
import { MenuItem } from "@/components/menu/item";

import { useCounterActions } from "@/hooks/counter";
import { useMediaQuery } from "@/hooks/media-query";
import { useView } from "@/hooks/store";

import {
  formatDate,
  formatFigures,
  formatMilestones,
  POLISH_LOCALE,
} from "@/i18n/polish";

import { heading } from "@/styles/heading";

import type { Counter as CounterType } from "@/types";

import { cx } from "@/utilities/cx";

import { Counter } from "./counter";

export type CounterListItemProps = Omit<ListItemProps, "children"> & {
  counter: CounterType;
  selected?: boolean;
};

export const CounterListItem = ({
  className,
  counter,
  selected,
  ...props
}: CounterListItemProps) => {
  const { deleteCounter, selectCounter } = useCounterActions();
  const largeScreen = useMediaQuery("(min-width: 1200px)");
  const { setView } = useView();

  return (
    <ListItem
      active={selected}
      borders={largeScreen ? "all" : "vertical"}
      className={cx(
        "flex flex-col gap-8 transition",
        selected
          ? "text-gray-900 dark:text-gray-100"
          : "text-gray-400 focus-within:text-gray-900 hover:text-gray-900 dark:text-gray-600 dark:focus-within:text-gray-100 dark:hover:text-gray-100",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-8">
        <h2 className={heading({ className: "truncate" })}>{counter.name}</h2>
        <time
          className="hidden whitespace-nowrap sm:block"
          dateTime={new Date(counter.timestamp).toISOString()}
        >
          {formatDate(
            new Date(counter.timestamp),
            largeScreen ? "long" : "short"
          )}
        </time>
        {largeScreen ? (
          <div className="ml-auto flex items-center gap-8">
            {!selected && (
              <Button
                icon={MdVisibility}
                onClick={() => {
                  selectCounter(counter.id);
                  setView("counter");
                }}
                variant="secondary"
              >
                Wyświetl
              </Button>
            )}
            <Button
              icon={MdEdit}
              onClick={() => {
                selectCounter(counter.id);
                setView("edit");
              }}
              variant="secondary"
            >
              Edytuj
            </Button>
            <Button
              className="text-red-500 hover:text-current focus-visible:text-current"
              icon={MdDelete}
              onClick={() => deleteCounter(counter.id)}
            >
              Usuń
            </Button>
          </div>
        ) : (
          <Menu className="ml-auto mr-6 sm:mr-0" text="Opcje">
            <MenuItem
              onClick={() => {
                selectCounter(counter.id);
                setView("counter");
              }}
            >
              Wyświetl
            </MenuItem>
            <MenuItem
              onClick={() => {
                selectCounter(counter.id);
                setView("edit");
              }}
            >
              Edytuj
            </MenuItem>
            <MenuItem
              className="text-red-500"
              onClick={() => deleteCounter(counter.id)}
            >
              Usuń
            </MenuItem>
          </Menu>
        )}
      </div>
      <Counter
        size={largeScreen ? "large" : "small"}
        timestamp={counter.timestamp}
      />
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:gap-8">
        <div className="flex justify-between gap-8 lg:justify-start">
          <div className="truncate whitespace-nowrap">
            {counter.milestones.length}{" "}
            {formatMilestones(counter.milestones.length).toLocaleLowerCase(
              POLISH_LOCALE
            )}
          </div>
          <div className="truncate whitespace-nowrap">
            {counter.figures.length}{" "}
            {formatFigures(counter.figures.length).toLocaleLowerCase(
              POLISH_LOCALE
            )}
          </div>
        </div>
        <div className="hidden gap-8 lg:flex">
          <div>
            <span>Utworzony: </span>
            <time dateTime={new Date(counter.createdAt).toISOString()}>
              {formatDate(new Date(counter.createdAt), "short")}
            </time>
          </div>
          <div>
            <span>Modyfikowany: </span>
            <time dateTime={new Date(counter.updatedAt).toISOString()}>
              {formatDate(new Date(counter.updatedAt), "short")}
            </time>
          </div>
        </div>
      </div>
    </ListItem>
  );
};
