import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html className="scroll-pt-52">
    <Head />
    <body className="flex min-h-screen flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
