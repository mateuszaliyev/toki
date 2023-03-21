import dynamic from "next/dynamic";
import Head from "next/head";

const Header = dynamic(
  () => import("@/components/header").then(({ Header }) => Header),
  { ssr: false }
);

const Main = dynamic(
  () => import("@/components/main").then(({ Main }) => Main),
  { ssr: false }
);

const HomePage = () => (
  <>
    <Head>
      <meta
        content="max-image-preview:none,noarchive,none,noimageindex,nositelinkssearchboxx,nosnippet,notranslate"
        name="robots"
      />
      <title>時 toki</title>
    </Head>
    <Header />
    <Main />
  </>
);

export default HomePage;
