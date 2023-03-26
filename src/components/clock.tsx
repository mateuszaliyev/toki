import { type TimeHTMLAttributes, useState } from "react";

import { useInterval } from "@/hooks/interval";

import { formatDate } from "@/i18n/polish";

export type ClockProps = Omit<
  TimeHTMLAttributes<HTMLTimeElement>,
  "children" | "dateTime"
>;

export const Clock = (props: ClockProps) => {
  const [date, setDate] = useState(new Date());

  useInterval(() => setDate(new Date()), 1000);

  return (
    <time dateTime={date.toISOString()} {...props}>
      {formatDate(new Date(), "long")}
    </time>
  );
};
