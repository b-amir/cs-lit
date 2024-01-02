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

        <meta name="title" content="CS Like I'm 10 !" />
        <meta
          name="description"
          content="A place for computer science enthusiasts to learn stuff easily"
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://cslit.cc" />
        <meta property="og:title" content="CS Like I'm 10 !" />
        <meta
          property="og:description"
          content="A place for computer science enthusiasts to learn stuff easily"
        />
        <meta
          property="og:image"
          content="blob:https://graygrids.com/33c7939a-57ea-4f21-b835-9a3c5f647d4e"
        />

        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://cslit.cc" />
        <meta property="twitter:title" content="CS Like I'm 10 !" />
        <meta
          property="twitter:description"
          content="A place for computer science enthusiasts to learn stuff easily"
        />
        <meta
          property="twitter:image"
          content="blob:https://graygrids.com/edd0304e-9fda-47d0-a6ec-75e8971b5ca0"
        />

        {/* favicon and touch icon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon.png?ebbb82dc3cc1b5eb"
          type="image/png"
          sizes="512x512"
        />
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
