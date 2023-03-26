import { Navigation } from "@/components/navigation";

import { useCounter } from "@/hooks/counter";
import { useView } from "@/hooks/store";

export const Header = () => {
  const counter = useCounter();
  const { view } = useView();

  return (
    <header className="fixed top-0 z-header flex h-16 w-full gap-10 border-b border-gray-300 bg-gray-100/80 before:absolute before:inset-0 before:z-[-1] before:backdrop-blur dark:border-gray-800 dark:bg-gray-900/50 lg:h-32">
      <svg
        className="h-6 shrink-0 self-center fill-current pl-4 lg:h-9 lg:pl-10"
        viewBox="0 0 28.892 10.046"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 .91h2.915v8.102H2.15v-.537H.765v.806H0zm3.287 2.749h2.676v-1.51H3.7v-.723h2.263V0h.786v1.426h2.46v.724h-2.46v1.509h2.925v.723H3.287zm.206 2.087h3.969V4.671h.786v1.075h1.477v.724H8.248v2.274q0 1.302-1.272 1.302-.682 0-1.374-.02-.062-.404-.155-.89.795.083 1.354.083.661 0 .661-.734V6.47H3.493zM.765 7.751H2.15V5.023H.765zM2.15 1.633H.765V4.32H2.15zm1.684 5.54.6-.476q.744.817 1.281 1.488l-.661.507q-.59-.796-1.22-1.52zM15.652 8.188h-.603c-.699 0-.942-.297-.942-.879V4.367h1.545v-.699h-1.545V2.144h-.826v1.524h-.804v.699h.804v2.931c0 1.112.477 1.588 1.62 1.588h.75zM18.669 8.94c1.344 0 2.223-.773 2.223-2.286v-.805c0-1.513-.879-2.286-2.223-2.286-1.344 0-2.212.773-2.212 2.286v.805c0 1.513.868 2.286 2.212 2.286zm0-4.657c.942 0 1.376.624 1.376 1.566v.794c0 .963-.434 1.577-1.376 1.577s-1.365-.614-1.365-1.577v-.794c0-.942.423-1.566 1.365-1.566zM25.834 8.834h1.027l-2.212-3.06L26.51 3.67h-.942L23.22 6.315V1.108h-.836v7.725h.836V7.394l.878-.995zM28.299 2.663c.35 0 .593-.232.593-.54s-.244-.539-.593-.539c-.328 0-.582.233-.582.54s.254.54.582.54zm-.413 6.17h.836V3.67h-.836z" />
      </svg>
      <div className="flex min-w-0 grow items-center justify-center">
        <h1 className="truncate text-2xl font-semibold lg:text-4xl">
          {view === "counter" && counter?.name}
        </h1>
      </div>
      <div className="flex select-none justify-end">
        <Navigation />
      </div>
    </header>
  );
};
