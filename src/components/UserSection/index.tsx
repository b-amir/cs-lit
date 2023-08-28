import Link from "next/link";
import { UserSkeleton } from "../Loading/Skeleton";
import { type USER_ROLE } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { getScreenName } from "@/utils/getScreenName";
import { Avatar } from "./Avatar";

export interface USER {
  id: string;
  role: USER_ROLE;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
export const UserSection = () => {
  const { data: sessionData, status } = useSession();
  const user = sessionData?.user as USER;

  return (
    <>
      {status === "loading" ? (
        <UserSkeleton />
      ) : (
        <div className="flex w-full flex-row">
          <Avatar user={user} />
          <div className="flex flex-col justify-center">
            <p className="font-regular px-1 text-left text-sm font-medium text-[#2A2A2E] sm:mb-1">
              {sessionData ? (
                <Link
                  href={`/profile/${user?.id}`}
                  className="cursor-pointer truncate whitespace-nowrap hover:underline"
                >
                  {getScreenName(user)}
                </Link>
              ) : null}
            </p>
            <button className="text-gray rounded-full bg-white/10 px-1 py-0 text-left text-[0.7rem] font-light no-underline transition-all">
              {sessionData ? (
                <div
                  className="group flex flex-row items-center text-[#606060] hover:text-[#000] "
                  onClick={() => void signOut()}
                >
                  <HiOutlineLogout className=" mr-1 stroke-[#606060] group-hover:stroke-[#000]" />{" "}
                  Sign out
                </div>
              ) : (
                <div
                  className="group flex flex-row items-center px-0.5 text-xs font-semibold text-[#606060] hover:text-[#000] sm:px-2 sm:text-sm "
                  onClick={() => void signIn()}
                >
                  <HiOutlineLogin className="mx-1 stroke-[#606060] group-hover:stroke-[#000] sm:mb-0.5" />{" "}
                  Sign in here
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
