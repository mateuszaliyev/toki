import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html className="scroll-pt-52">
    <Head>
      <link
        href="/assets/images/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/assets/images/favicons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/assets/images/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/assets/images/favicons/site.webmanifest" rel="manifest" />
      <link
        color="#00aba9"
        href="/assets/images/favicons/safari-pinned-tab.svg"
        rel="mask-icon"
      />
      <link href="/assets/images/favicons/favicon.ico" rel="shortcut icon" />
      <meta content="toki" name="apple-mobile-web-app-title" />
      <meta content="toki" name="application-name" />
      <meta content="#00aba9" name="msapplication-TileColor" />
      <meta
        content="/assets/images/favicons/browserconfig.xml"
        name="msapplication-config"
      />
      <meta content="#0e0e10" name="theme-color" />
      <meta
        content="max-image-preview:none,noarchive,none,noimageindex,nositelinkssearchboxx,nosnippet,notranslate"
        name="robots"
      />
    </Head>
    <body className="flex min-h-screen flex-col bg-gray-100 text-gray-900 pink:font-serif dark:bg-gray-900 dark:text-gray-100">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
