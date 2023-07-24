// import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ProfilePopUp } from "./ProfilePopUp";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";

export const UserSection = (props: {
  userSectionShown: any;
  setUserSectionShown: any;
}) => {
  const { data: sessionData, status } = useSession();
  const { userSectionShown, setUserSectionShown } = props;

  if (status === "loading") return <></>;

  return (
    <>
      <div className="border-b-1 top-0  mb-0 flex h-[calc(90px+1.5px)] w-full flex-row items-center border  border-x-0 border-t-0 bg-[#F9F9F9] px-5 py-4 align-middle shadow-sm transition-all">
        <button
          type="button"
          className="top-0 mr-2 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
        >
          {sessionData ? (
            <Image
              src={sessionData?.user.image || "/assets/avatar.webp"}
              className="min-h-15 min-w-15 rounded-full ring-1 ring-gray-300 "
              width={36}
              height={36}
              alt={`${sessionData?.user}'s image`}
              onClick={() => setUserSectionShown(true)}
            />
          ) : (
            <div className="h-15 w-15 animate-pulse rounded-full bg-[#D9D9D9]" />
          )}
        </button>
        <div className="flex flex-col">
          <p
            className="font-regular mb-1 cursor-pointer px-2 text-left text-sm font-medium text-[#2A2A2E] "
            onClick={() => setUserSectionShown(true)}
          >
            {sessionData ? (
              <span className="overflow-clip overflow-ellipsis whitespace-nowrap">
                {sessionData.user?.name || sessionData.user?.email}
              </span>
            ) : (
              "Wanna contribute?"
            )}
          </p>
          <button className="text-gray rounded-full bg-white/10 px-2 py-0 text-left text-xs font-light no-underline  transition-all">
            {sessionData ? (
              <div
                className="flex flex-row text-[#606060] hover:text-[#000] "
                onClick={() => signOut()}
              >
                <HiOutlineLogout className="mr-1 stroke-[#606060] " /> Sign out
              </div>
            ) : (
              <div
                className="flex flex-row text-[#606060] hover:text-[#000] "
                onClick={() => signIn()}
              >
                <HiOutlineLogin className="mr-1 stroke-[#606060] " /> Sign in
              </div>
            )}
          </button>
        </div>
      </div>
      <ProfilePopUp
        username={sessionData?.user}
        userSectionShown={userSectionShown}
        setUserSectionShown={setUserSectionShown}
      />
    </>
  );
};
