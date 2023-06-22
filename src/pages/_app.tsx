import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Head from "next/head";
import "../styles/nprogress.css";
import { useProgress } from "../hooks/useProgress";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}) => {
  useProgress(router);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Explain CS like I&apos;m 10</title>
        <meta
          name="description"
          content="A place for computer science enthusiasts to learn stuff easily"
        />
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
