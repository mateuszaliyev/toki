import { useEffect, useState } from "react";

const getInitialValue = (query: string, defaultValue?: boolean) => {
  if (defaultValue) {
    return defaultValue;
  }

  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }

  return false;
};

export const useMediaQuery = (query: string, defaultValue?: boolean) => {
  const [matches, setMatches] = useState(getInitialValue(query, defaultValue));

  useEffect(() => {
    const handleMediaQueryListChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    const mediaQueryList = window.matchMedia(query);

    mediaQueryList.addEventListener("change", handleMediaQueryListChange);

    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryListChange);
    };
  }, [query]);

  return matches;
};
