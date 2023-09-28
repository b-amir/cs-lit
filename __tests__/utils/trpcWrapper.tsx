import superjson from "superjson";
import { AppRouter } from "@/server/api/root";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink, loggerLink } from "@trpc/react-query";
import { Session } from "next-auth";

// setting up the trpc wrapper
// this is necessary due to wrap around every component that we're gonna render during testing

const trpc = createTRPCReact<AppRouter>();
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => false,
    }),
    httpBatchLink({
      url: `http://localhost:${process.env.PORT ?? 3000}/api/trpc`,
    }),
  ],
  transformer: superjson,
});

interface TRPClientProviderProps {
  children: React.ReactNode;
  withSessionProvider?: boolean; // Optional prop to decide whether to include SessionProvider
}

export const TRPClientProvider: React.FC<TRPClientProviderProps> = ({
  children,
  withSessionProvider = true,
}) => {
  const session: Session | null = withSessionProvider
    ? {
        expires: "1",
        user: {
          id: "test",
          name: "test",
          email: "test",
          image: "/test",
          role: "USER",
        },
      }
    : null;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
