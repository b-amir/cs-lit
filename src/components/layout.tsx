import type { PropsWithChildren } from "react";
// import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { Navbar } from "./Navbar";
import { SidebarLeft } from "./SidebarLeft";
import { SidebarRight } from "./SidebarRight";

import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

export const PageLayout = (props: PropsWithChildren<{}>) => {
  // the clerk way
  // const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  // the next-auth way
  const { data: sessionData, status } = useSession();

  // get by username
  // const { data } = api.profile.getUserByUsername.useQuery({
  //   username: user?.username ?? "",
  // });

  // get by user id
  // const { data } = api.profile.getUserById.useQuery({
  //   id: sessionData?.user?.id ?? "",
  // });

  return (
    <>
      <div className="flex items-center justify-center">
        <Navbar />
        <SidebarLeft username={sessionData?.user} />
        <SidebarRight username={sessionData?.user} />
        <main
          className="flex h-full min-h-[100dvh] w-4/6 flex-col items-center justify-center bg-[#EBEAE8]"
          style={
            {
              // noisy background
              // inset: 0,
              // backgroundImage: "url(./assets/noise.webp)",
              // mixBlendMode: "color-dodge",
            }
          }
        >
          {/* <div className="container flex h-screen flex-col items-center justify-center gap-1 px-0 py-0 pt-0"> */}
          <div className="container ">{props.children}</div>
        </main>
      </div>
    </>
  );
};
