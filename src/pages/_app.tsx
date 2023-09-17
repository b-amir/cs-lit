import Head from "next/head";
import { api } from "@/utils/api";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { useProgress } from "../hooks/useProgress";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "../styles/nprogress.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}) => {
  useProgress(router);

  const toastOptions = {
    className: "toast",
    style: {
      color: "#fff",
      fontSize: "0.9rem",
      maxWidth: "fit-content",
      borderRadius: "17px",
      backgroundColor: "#2A2A2E",
    },
  };

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Explain CS like I&apos;m 10</title>
        <meta
          name="description"
          content="A place for computer science enthusiasts to learn stuff easily"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        // onReset={() => window.location.replace("/")}
      >
        <Provider store={store}>
          <Toaster toastOptions={toastOptions} />
          <Component {...pageProps} />
        </Provider>
      </ErrorBoundary>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
