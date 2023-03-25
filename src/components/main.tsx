import { CounterForm } from "@/components/counter/form";
import { CounterList } from "@/components/counter/list";
import { CounterView } from "@/components/counter/view";

import { useView } from "@/hooks/store";

export const Main = () => {
  const { view } = useView();

  return (
    <main className="mt-16 flex grow flex-col lg:mt-32">
      {view === "create" && <CounterForm />}
      {view === "counter" && <CounterView />}
      {view === "edit" && <CounterForm editSelected />}
      {view === "list" && <CounterList />}
    </main>
  );
};
