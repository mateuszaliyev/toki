import { BioRhyme } from "next/font/google";
import localFont from "next/font/local";
import Head from "next/head";

const bioRhyme = BioRhyme({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const supreme = localFont({
  src: "../../public/assets/fonts/supreme/supreme-variable.woff2",
});

export const Fonts = () => (
  <Head>
    <style
      dangerouslySetInnerHTML={{
        __html: `:root { --font-bio-rhyme: ${bioRhyme.style.fontFamily}; --font-supreme: ${supreme.style.fontFamily} }`,
      }}
      id="next-font"
    />
  </Head>
);
