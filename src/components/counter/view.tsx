import { useMemo } from "react";
import { VscHeartFilled } from "react-icons/vsc";

import { useTheme } from "next-themes";

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

  const milestones = useMemo(
    () => ({
      completed: counter?.milestones.filter(
        ({ timestamp }) => timestamp < Date.now()
      ),
      pending: counter?.milestones
        .filter(({ timestamp }) => timestamp > Date.now())
        .sort((a, z) => (a.timestamp < z.timestamp ? -1 : 1)),
    }),
    [counter?.milestones]
  );

  const largeScreen = useMediaQuery("(min-width: 1072px)");
  const { theme } = useTheme();

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
      <section className="grid grid-cols-1 gap-10 px-4 xl:grid-cols-2 xl:px-10">
        <div>
          <div className="flex gap-2">
            <h2 className={heading()}>Kamienie milowe</h2>
            {theme === "pink" && (
              <div className="flex grow items-center overflow-x-hidden">
                {milestones.completed?.map((milestone) => (
                  <VscHeartFilled className="h-6 w-6" key={milestone.id} />
                ))}
              </div>
            )}
          </div>
          <ul className="py-10">
            {milestones.pending?.map((milestone) => (
              <ListItem
                borders={largeScreen ? "all" : "vertical"}
                className="group flex flex-col gap-8"
                key={milestone.id}
              >
                <div className="flex items-center gap-8 whitespace-nowrap">
                  <h3
                    className={heading({
                      className: "truncate",
                    })}
                    id={milestone.id}
                  >
                    {milestone.name}
                  </h3>
                  <time
                    className="text-gray-400 transition group-hover:text-gray-900 dark:text-gray-600 dark:group-hover:text-gray-100 sm:hidden"
                    dateTime={new Date(milestone.timestamp).toISOString()}
                  >
                    {formatDate(milestone.timestamp, "short")}
                  </time>
                  <time
                    className="hidden text-gray-400 transition group-hover:text-gray-900 dark:text-gray-600 dark:group-hover:text-gray-100 sm:block"
                    dateTime={new Date(milestone.timestamp).toISOString()}
                  >
                    {formatDate(milestone.timestamp, "long")}
                  </time>
                </div>
                <Counter size="small" timestamp={milestone.timestamp} />
                <MilestoneProgress
                  aria-labelledby={milestone.id}
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
                className="group flex items-center gap-8 text-2xl lg:text-4xl"
                key={figure.id}
              >
                <h3 className="truncate">{figure.name}</h3>
                <span className="hidden whitespace-nowrap text-base text-gray-400 transition group-hover:text-gray-900 dark:text-gray-600 dark:group-hover:text-gray-100 sm:flex">
                  {figure.quantity} co {figure.value}{" "}
                  {dateFormatters[figure.unit](figure.value).toLocaleLowerCase(
                    POLISH_LOCALE
                  )}
                </span>
                <span className="ml-auto">
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
