import Link from "next/link";
import Image from "next/image";
import { UserSkeleton } from "./Skeleton";
import { type USER_ROLE } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaRegUserCircle as EmptyAvatar } from "react-icons/fa";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { getScreenName } from "@/utils/getScreenName";

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
                  className="cursor-pointer overflow-clip overflow-ellipsis whitespace-nowrap hover:underline"
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
                  className="group flex flex-row items-center px-0.5 text-sm font-semibold text-[#606060] hover:text-[#000] sm:px-2 "
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

function Avatar({ user }: { user: USER }) {
  return (
    <>
      {user && user.id !== undefined ? (
        <Link
          href={`/profile/${user.id}`}
          className="mr-2 flex items-center rounded-full focus:ring-4 focus:ring-gray-300"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
        >
          <Image
            src={user?.image || "/assets/defaultpp.svg"}
            className="h-9 w-9 rounded-full bg-[#F9F9F9] ring-2 ring-[#5858582b] transition-all hover:ring-gray-300"
            width={36}
            height={36}
            alt={`${getScreenName(user) ?? ""}'s image`}
          />
        </Link>
      ) : (
        <div className="my-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#95959521] shadow-sm transition-all hover:border-[#0000002c]">
          <EmptyAvatar
            onClick={() => void signIn()}
            className="h-6 w-6  text-[#3f3f3f3d] "
          />
        </div>
      )}
    </>
  );
}
