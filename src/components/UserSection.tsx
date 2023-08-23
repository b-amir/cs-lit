import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { UserSkeleton } from "./Skeleton";
import Link from "next/link";
import { type USER_ROLE } from "@prisma/client";

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
    <div className="border-b-1 top-0 mb-0 flex h-[calc(90px+1.5px)] w-full flex-row items-center border border-x-0 border-t-0 bg-[#F9F9F9] px-5 py-4 align-middle shadow-sm transition-all">
      {status === "loading" ? (
        <UserSkeleton />
      ) : (
        <>
          {user && user.id !== undefined && (
            <Link
              href={`/profile/${user.id}`}
              className="top-0 mr-2 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <Image
                src={user?.image || "/assets/defaultpp.svg"}
                className="rounded-full bg-[#F9F9F9] ring-2 ring-gray-200 transition-all hover:ring-gray-300"
                width={36}
                height={36}
                alt={`${user?.name ?? ""}'s image`}
              />
            </Link>
          )}
          <div className="flex flex-col">
            <p className="font-regular mb-1 px-2 text-left text-sm font-medium text-[#2A2A2E]">
              {sessionData ? (
                <Link
                  href={`/profile/${user?.id}`}
                  className="cursor-pointer overflow-clip overflow-ellipsis whitespace-nowrap"
                >
                  {user?.name || user?.email}
                </Link>
              ) : (
                "Wanna contribute?"
              )}
            </p>
            <button className="text-gray rounded-full bg-white/10 px-2 py-0 text-left text-xs font-light no-underline transition-all">
              {sessionData ? (
                <div
                  className="flex flex-row items-center text-[#606060] hover:text-[#000] "
                  onClick={() => void signOut()}
                >
                  <HiOutlineLogout className=" mr-1 stroke-[#606060] " /> Sign
                  out
                </div>
              ) : (
                <div
                  className="flex flex-row items-center text-[#606060] hover:text-[#000] "
                  onClick={() => void signIn()}
                >
                  <HiOutlineLogin className=" mr-1 stroke-[#606060] " /> Sign in
                </div>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
