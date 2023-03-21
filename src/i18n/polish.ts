import type { Unit } from "@/types";

export type PolishPluralRule = Extract<
  Intl.LDMLPluralRule,
  "few" | "many" | "one"
>;

export const POLISH_LOCALE = "pl";

const polishPluralRules = new Intl.PluralRules(POLISH_LOCALE);

export const formatPolishPlural =
  (rules: Record<PolishPluralRule, string>) => (value: number) =>
    rules[polishPluralRules.select(value) as PolishPluralRule];

export const formatDate = (date: Date | number, style: "long" | "short") => {
  const dateTimeFormat = new Intl.DateTimeFormat(POLISH_LOCALE, {
    dateStyle: style === "short" ? "short" : "full",
    timeStyle: "short",
  });

  try {
    return dateTimeFormat.format(date);
  } catch (error) {
    return null;
  }
};

export const formatDays = formatPolishPlural({
  few: "Dni",
  many: "Dni",
  one: "Dzień",
});

export const formatFigures = formatPolishPlural({
  few: "Powiązane wartości",
  many: "Powiązanych wartości",
  one: "Powiązana wartość",
});

export const formatHours = formatPolishPlural({
  few: "Godziny",
  many: "Godzin",
  one: "Godzina",
});

export const formatMilestones = formatPolishPlural({
  few: "Kamienie milowe",
  many: "Kamieni milowych",
  one: "Kamień milowy",
});

export const formatMinutes = formatPolishPlural({
  few: "Minuty",
  many: "Minut",
  one: "Minuta",
});

export const formatMonths = formatPolishPlural({
  few: "Miesiące",
  many: "Miesięcy",
  one: "Miesiąc",
});

export const formatSeconds = formatPolishPlural({
  few: "Sekundy",
  many: "Sekund",
  one: "Sekunda",
});

export const formatYears = formatPolishPlural({
  few: "Lata",
  many: "Lat",
  one: "Rok",
});

export const dateFormatters: Record<Unit, (value: number) => string> = {
  days: formatDays,
  hours: formatHours,
  minutes: formatMinutes,
  months: formatMonths,
  seconds: formatSeconds,
  years: formatYears,
};

export const formatTheme = (theme?: string) => {
  if (theme === "dark") return "Ciemny";
  if (theme === "light") return "Jasny";
  if (theme === "pink") return "Różowy";
  if (theme === "system") return "Systemowy";
};
