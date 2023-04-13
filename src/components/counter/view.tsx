import { ListItem } from "@/components/list/item";

import { useCounter } from "@/hooks/counter";
import { useMediaQuery } from "@/hooks/media-query";

import { dateFormatters, POLISH_LOCALE } from "@/i18n/polish";

import { heading } from "@/styles/heading";

import { Counter } from "./counter";
import { Figure } from "./figure";
import { Milestones } from "./milestones";

export const CounterView = () => {
  const counter = useCounter();

  const largeScreen = useMediaQuery("(min-width: 1072px)");

  if (!counter) return null;

  return (
    <>
      <section className="flex grow flex-col justify-center gap-8 py-10">
        <Counter
          bordered={largeScreen}
          size={largeScreen ? "large" : "small"}
          timestamp={counter.timestamp}
        />
      </section>
      <section className="flex flex-col-reverse gap-10 px-4 xl:grid xl:grid-cols-2 xl:px-10">
        <Milestones />
        <div>
          <h2 className={heading({ size: "medium" })}>Powiązane wartości</h2>
          <ul className="py-10">
            {counter.figures.map((figure) => (
              <ListItem
                borders="vertical"
                className="group flex flex-wrap items-center justify-between gap-8 text-2xl lg:text-4xl xl:flex-nowrap"
                key={figure.id}
              >
                <h3 className="truncate">{figure.name}</h3>
                <span className="mr-auto hidden whitespace-nowrap text-base text-gray-400 transition group-hover:text-gray-900 dark:text-gray-600 dark:group-hover:text-gray-100 sm:flex">
                  {figure.quantity} co {figure.value}{" "}
                  {dateFormatters[figure.unit](figure.value).toLocaleLowerCase(
                    POLISH_LOCALE
                  )}
                </span>
                <span className="xl:ml-auto">
                  <Figure figure={figure} timestamp={counter.timestamp} />
                </span>
              </ListItem>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
