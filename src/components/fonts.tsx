import Head from "next/head";

import localFont from "@next/font/local";

const supreme = localFont({
  src: "../../public/assets/fonts/supreme/supreme-variable.woff2",
});

export const Fonts = () => (
  <Head>
    <style
      dangerouslySetInnerHTML={{
        __html: `:root { --font-supreme: ${supreme.style.fontFamily} }`,
      }}
      id="next-font"
    />
  </Head>
);
