import { ListItem } from "@/components/list/item";

import { useCounter } from "@/hooks/counter";
import { useMediaQuery } from "@/hooks/media-query";

import { dateFormatters, formatDate, POLISH_LOCALE } from "@/i18n/polish";

import { heading } from "@/styles/heading";

import { Counter } from "./counter";
import { Figure } from "./figure";
import { MilestoneProgress } from "./milestone-progress";

export const CounterView = () => {
  const counter = useCounter();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!counter) return null;

  return (
    <>
      <section className="flex flex-grow flex-col justify-center gap-8 p-10">
        <Counter
          bordered={isDesktop}
          size={isDesktop ? "large" : "small"}
          timestamp={counter.timestamp}
        />
      </section>
      <section className="grid grid-cols-1 gap-10 px-4 lg:grid-cols-2 lg:px-10">
        <div>
          <h2 className={heading({ size: "medium" })}>Kamienie milowe</h2>
          <ul className="py-10">
            {counter.milestones.map((milestone) => (
              <ListItem
                borders="vertical"
                className="flex flex-col gap-8"
                key={milestone.id}
              >
                <div className="flex items-center gap-8">
                  <h3 className={heading({ size: "medium" })}>
                    {milestone.name}
                  </h3>
                  <time>{formatDate(milestone.timestamp, "long")}</time>
                </div>
                <Counter size="small" timestamp={milestone.timestamp} />
                <MilestoneProgress
                  milestone={milestone}
                  timestamp={counter.timestamp}
                />
              </ListItem>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={heading({ size: "medium" })}>Powiązane wartości</h2>
          <ul className="py-10">
            {counter.figures.map((figure) => (
              <ListItem
                borders="vertical"
                className="flex items-center gap-8"
                key={figure.id}
              >
                <h3 className="text-4xl">{figure.name}</h3>
                <span className="mr-auto text-gray-400 dark:text-gray-600">
                  {figure.quantity} co {figure.value}{" "}
                  {dateFormatters[figure.unit](figure.value).toLocaleLowerCase(
                    POLISH_LOCALE
                  )}
                </span>
                <span className="text-4xl">
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
