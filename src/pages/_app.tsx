import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Fonts } from "@/components/fonts";

import "@/styles/globals.css";

const Application = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <Fonts />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default Application;
