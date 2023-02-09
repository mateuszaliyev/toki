import { ListItem } from "@/components/list/item";

import { useCounter } from "@/hooks/counter";

import { dateFormatters, formatDate, POLISH_LOCALE } from "@/i18n/polish";

import { heading } from "@/styles/heading";

import { Counter } from "./counter";
import { Figure } from "./figure";
import { MilestoneProgress } from "./milestone-progress";

export const CounterView = () => {
  const counter = useCounter();

  return counter ? (
    <>
      <section className="relative -mt-40 flex min-h-screen flex-grow flex-col justify-center gap-8 px-10">
        <h1 className="flex h-32 items-center justify-center text-8xl">
          {counter.name}
        </h1>
        <Counter bordered timestamp={counter.timestamp} />
      </section>
      {counter.milestones.length > 0 ? (
        <section className="flex flex-grow flex-col justify-center gap-8 px-10 pb-10">
          <h2 className={heading({ size: "large", tall: true })}>
            Kamienie milowe
          </h2>
          <ul>
            {counter.milestones.map((milestone) => (
              <ListItem
                borders="all"
                className="flex flex-col gap-8"
                key={milestone.id}
              >
                <div className="flex items-center gap-8">
                  <h3 className={heading({ size: "medium" })}>
                    {milestone.name}
                  </h3>
                  <time>{formatDate(milestone.timestamp, "long")}</time>
                </div>
                <Counter timestamp={milestone.timestamp} />
                <MilestoneProgress
                  milestone={milestone}
                  timestamp={counter.timestamp}
                />
              </ListItem>
            ))}
          </ul>
        </section>
      ) : null}
      {counter.figures.length > 0 ? (
        <section className="flex flex-grow flex-col justify-center gap-8 px-10 pb-10">
          <h2 className={heading({ size: "large", tall: true })}>
            Powiązane wartości
          </h2>
          <ul>
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
        </section>
      ) : null}
    </>
  ) : null;
};
