import { useEffect } from "react";

import dynamic from "next/dynamic";

import { Clock } from "@/components/clock";

import { useCounter, useCounters } from "@/hooks/counter";
import { useHeaderHeight, useView } from "@/hooks/store";

import { HeaderButton } from "./button";

const ThemeButton = dynamic(
  () =>
    import("@/components/button/theme").then(({ ThemeButton }) => ThemeButton),
  { ssr: false }
);

export const Header = () => {
  const counter = useCounter();
  const counters = useCounters();
  const { headerHeight, setHeaderHeight } = useHeaderHeight();
  const { setView, view } = useView();

  useEffect(() => {
    const handleScroll = () =>
      setHeaderHeight(Math.max(160 - window.scrollY, 80));
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setHeaderHeight]);

  return (
    <header
      className="fixed top-0 z-header flex w-full justify-between border-b border-gray-300 bg-gray-100/80 px-10 backdrop-blur dark:border-gray-800 dark:bg-gray-900/50"
      style={{ height: headerHeight }}
    >
      <div className="flex select-none items-center justify-center gap-8 text-4xl">
        <span>時 toki</span>
        <ThemeButton />
      </div>
      <div className="flex text-lg">
        <HeaderButton
          borders={headerHeight >= 120}
          onClick={() => setView("counter")}
          secondary={headerHeight >= 120 ? counter?.name : undefined}
          selected={view === "counter"}
        >
          Licznik
        </HeaderButton>
        <HeaderButton
          borders={headerHeight >= 120}
          onClick={() => setView("list")}
          secondary={headerHeight >= 120 ? counters.length : undefined}
          selected={view === "list"}
        >
          Lista
        </HeaderButton>
        <HeaderButton
          borders={headerHeight >= 120}
          onClick={() => setView("create")}
          selected={view === "create"}
        >
          Nowy
        </HeaderButton>
      </div>
      <div className="flex items-center">
        <Clock />
      </div>
    </header>
  );
};
