import { CounterForm } from "@/components/counter/form";
import { CounterList } from "@/components/counter/list";
import { CounterView } from "@/components/counter/view";

import { useHeaderHeight, useView } from "@/hooks/store";

export const Main = () => {
  const { headerHeight } = useHeaderHeight();
  const { view } = useView();

  return (
    <main
      className="flex flex-grow flex-col"
      style={{
        marginTop: headerHeight,
      }}
    >
      {view === "create" && <CounterForm />}
      {view === "counter" && <CounterView />}
      {view === "edit" && <CounterForm editSelected />}
      {view === "list" && <CounterList />}
    </main>
  );
};
