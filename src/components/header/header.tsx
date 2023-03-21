import { Navigation } from "@/components/navigation";

import { useCounter } from "@/hooks/counter";
import { useView } from "@/hooks/store";

export const Header = () => {
  const counter = useCounter();
  const { view } = useView();

  return (
    <header className="fixed top-0 z-header grid h-16 w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] justify-between border-b border-gray-300 bg-gray-100/80 before:absolute before:inset-0 before:z-[-1] before:backdrop-blur dark:border-gray-800 dark:bg-gray-900/50 lg:h-32">
      <div className="flex select-none items-center gap-8 pl-4 text-2xl lg:pl-10 lg:text-4xl">
        時 toki
      </div>
      <h1 className="flex select-none items-center justify-center text-2xl font-semibold lg:text-4xl">
        {view === "counter" && counter?.name}
      </h1>
      <div className="flex justify-end">
        <Navigation />
      </div>
    </header>
  );
};
