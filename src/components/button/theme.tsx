import { useTheme } from "next-themes";

import { formatTheme } from "@/i18n/polish";

export const ThemeButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="relative h-5 w-5 rounded-full border border-current bg-gray-900 before:absolute before:top-0 before:left-0 before:bottom-0 before:flex before:w-1/2 before:rounded-l-full before:bg-gray-100"
      onClick={() => {
        if (theme === "light") return setTheme("dark");
        if (theme === "system") return setTheme("light");
        return setTheme("system");
      }}
      title={formatTheme(theme)}
    />
  );
};
