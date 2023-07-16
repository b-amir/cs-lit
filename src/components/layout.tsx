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
        <main className="flex h-full min-h-[100dvh] w-4/6 flex-col items-center justify-center bg-[#EBEAE8] ">
          <div className="container top-0 ">{props.children}</div>
        </main>
      </div>
    </>
  );
};
