import { useEffect, useRef } from "react";

export const useInterval = (
  callback: (...parameters: unknown[]) => void,
  delay: number
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    const interval = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(interval);
  }, [delay]);
};
