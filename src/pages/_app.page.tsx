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
          content="A space for computer science enthusiasts to easily grasp complex subjects."
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://cslit.cc" />
        <meta property="og:title" content="CS Like I'm 10 !" />
        <meta
          property="og:description"
          content="A space for computer science enthusiasts to easily grasp complex subjects."
        />
        <meta
          property="og:image"
          content="blob:https://graygrids.com/1d6c5592-4a9f-404e-aeab-9cd67bbbe2ce"
        />

        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://cslit.cc" />
        <meta property="twitter:title" content="CS Like I'm 10 !" />
        <meta
          property="twitter:description"
          content="A space for computer science enthusiasts to easily grasp complex subjects."
        />
        <meta
          property="twitter:image"
          content="blob:https://graygrids.com/5befcfa6-65a4-4b6d-a6b4-decd5a23bee8"
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
