import { useEffect, useRef } from "react";
import { MdDownload, MdUpload } from "react-icons/md";

import { Button } from "@/components/button";

import {
  COUNTER_STORE_LATEST_VERSION,
  type CounterStoreStorage,
  useCounter,
  useCounterActions,
  useCounters,
} from "@/hooks/counter";

import { heading } from "@/styles/heading";

import { downloadAsJson } from "@/utilities/download-as-json";

import { CounterListItem } from "./list-item";

export const CounterList = () => {
  const selectedCounter = useCounter();
  const { importCounters } = useCounterActions();
  const counters = useCounters();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = {
      state: {
        counters,
        selectedCounter: selectedCounter?.id,
      },
      version: COUNTER_STORE_LATEST_VERSION,
    };

    downloadAsJson(data, "toki.json");
  };

  const handleImportClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    const input = inputRef.current;

    const handleImport = async () => {
      const file = await inputRef.current?.files?.[0].text();

      if (!file) return;

      importCounters(JSON.parse(file) as CounterStoreStorage);

      if (inputRef.current) inputRef.current.value = "";
    };

    inputRef.current?.addEventListener("change", () => void handleImport());

    return () => {
      input?.removeEventListener("change", () => void handleImport());
    };
  }, [importCounters]);

  return (
    <section className="px-4 pb-10 sm:px-10">
      <header className="flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:py-0">
        <h1
          className={heading({
            className: "mr-auto sm:flex sm:h-32 sm:items-center",
          })}
        >
          Twoje liczniki
        </h1>
        <div className="flex items-center gap-8 sm:ml-auto">
          <Button icon={MdDownload} onClick={handleExport} variant="secondary">
            Eksportuj
          </Button>
          <Button
            icon={MdUpload}
            onClick={handleImportClick}
            variant="secondary"
          >
            Importuj
            <input
              accept="application/json"
              className="hidden"
              ref={inputRef}
              type="file"
            />
          </Button>
        </div>
      </header>
      <ul>
        {counters.map((counter) => (
          <CounterListItem
            counter={counter}
            key={counter.id}
            selected={counter.id === selectedCounter?.id}
          />
        ))}
      </ul>
    </section>
  );
};
