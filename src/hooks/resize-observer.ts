import { useEffect, useMemo, useRef, useState } from "react";

export const useResizeObserver = <Element extends HTMLElement>() => {
  const ref = useRef<Element>(null);
  const [entry, setEntry] = useState<ResizeObserverEntry>();

  const resizeObserver = useMemo(
    () =>
      new ResizeObserver((entries) => {
        for (const entry of entries) setEntry(entry);
      }),
    []
  );

  useEffect(() => {
    if (!ref.current) return;

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [resizeObserver]);

  return [ref, entry] as const;
};
