import { useState } from "react";
import { VscHeartFilled } from "react-icons/vsc";

import { useTheme } from "next-themes";

import { ListItem } from "@/components/list/item";
import { Tooltip } from "@/components/tooltip";

import { useCounter } from "@/hooks/counter";
import { useInterval } from "@/hooks/interval";
import { useMediaQuery } from "@/hooks/media-query";

import { formatDate } from "@/i18n/polish";

import { heading } from "@/styles/heading";

import type { Milestone } from "@/types";

import { Counter } from "./counter";
import { MilestoneProgress } from "./milestone-progress";

export const Milestones = () => {
  const counter = useCounter();

  const [completed, setCompleted] = useState<Milestone[]>(
    counter?.getMilestones("completed") ?? []
  );

  const [pending, setPending] = useState<Milestone[]>(
    counter?.getMilestones("pending") ?? []
  );

  const largeScreen = useMediaQuery("(min-width: 1072px)");
  const { theme } = useTheme();

  useInterval(() => {
    if (!counter) return;
    setCompleted(counter.getMilestones("completed"));
    setPending(counter.getMilestones("pending"));
  }, 1000);

  if (!counter) return null;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <h2 className={heading()}>Kamienie milowe</h2>
        {theme === "pink" && (
          <ul className="flex grow items-center overflow-x-auto">
            {completed.map((milestone) => (
              <Tooltip
                key={milestone.id}
                trigger={<VscHeartFilled className="h-6 w-6" />}
              >
                {milestone.name}
              </Tooltip>
            ))}
          </ul>
        )}
      </div>
      <ul className="py-10">
        {pending.map((milestone) => (
          <ListItem
            borders={largeScreen ? "all" : "vertical"}
            className="group flex flex-col gap-8"
            key={milestone.id}
          >
            <div className="flex flex-wrap items-center gap-8 whitespace-nowrap sm:flex-row">
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
  );
};
