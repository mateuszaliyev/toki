import { type TimeHTMLAttributes, useState } from "react";

import { useInterval } from "@/hooks/interval";

import { formatDate } from "@/i18n/polish";

export type ClockProps = Omit<TimeHTMLAttributes<HTMLTimeElement>, "children">;

export const Clock = (props: ClockProps) => {
  const [clock, setClock] = useState(formatDate(new Date(), "long"));

  useInterval(() => setClock(formatDate(new Date(), "long")), 1000);

  return <time {...props}>{clock}</time>;
};
