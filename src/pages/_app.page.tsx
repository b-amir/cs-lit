import Head from "next/head";
import { api } from "@/utils/api";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { useProgress } from "../hooks/useProgress";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { ErrorBoundary } from "react-error-boundary";
import { SessionProvider } from "next-auth/react";
import ErrorFallback from "@/components/ErrorFallback";
import "@/styles/globals.css";
import "../styles/nprogress.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}) => {
  useProgress(router);

  const toastOptions = {
    className: "toast-notification",
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