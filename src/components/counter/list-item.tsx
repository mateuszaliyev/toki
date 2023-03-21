import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";

import { Button } from "@/components/button";
import { ListItem, type ListItemProps } from "@/components/list/item";

import { useCounterActions } from "@/hooks/counter";
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
  const { setView } = useView();

  return (
    <ListItem
      active={selected}
      borders="all"
      className={cx(
        "flex flex-col gap-8 transition",
        selected
          ? "text-gray-900 dark:text-gray-100"
          : "text-gray-400 hover:text-gray-900 dark:text-gray-600 dark:hover:text-gray-100",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-8">
        <h2 className={heading({ size: "medium" })}>{counter.name}</h2>
        <time className="mr-auto">
          {formatDate(new Date(counter.timestamp), "long")}
        </time>
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
          className="text-red-500 hover:text-current"
          icon={MdDelete}
          onClick={() => deleteCounter(counter.id)}
        >
          Usuń
        </Button>
      </div>
      <Counter timestamp={counter.timestamp} />
      <div className="flex gap-8">
        <div>
          {counter.milestones.length}{" "}
          {formatMilestones(counter.milestones.length).toLocaleLowerCase(
            POLISH_LOCALE
          )}
        </div>
        <div>
          {counter.figures.length}{" "}
          {formatFigures(counter.figures.length).toLocaleLowerCase(
            POLISH_LOCALE
          )}
        </div>
        <div>
          <span>Utworzony: </span>
          <time>{formatDate(new Date(counter.createdAt), "short")}</time>
        </div>
        <div>
          <span>Modyfikowany: </span>
          <time>{formatDate(new Date(counter.updatedAt), "short")}</time>
        </div>
      </div>
    </ListItem>
  );
};
