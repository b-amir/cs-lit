import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { UserSkeleton } from "./Skeleton";
import Link from "next/link";
import { type USER_ROLE } from "@prisma/client";
import { FaRegUserCircle as EmptyAvatar } from "react-icons/fa";

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
    <div>
      {status === "loading" ? (
        <UserSkeleton />
      ) : (
        <div className="flex w-full flex-row">
          <Avatar user={user} />
          <div className="flex flex-col">
            <p className="font-regular mb-1 px-1 text-left text-sm font-medium text-[#2A2A2E]">
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
            <button className="text-gray rounded-full bg-white/10 px-1 py-0 text-left text-xs font-light no-underline transition-all">
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
        </div>
      )}
    </div>
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
            alt={`${user?.name ?? ""}'s image`}
          />
        </Link>
      ) : (
        <div className="my-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#95959521] shadow-sm ">
          <EmptyAvatar className="h-6 w-6 text-[#3f3f3f3d]" />
        </div>
      )}
    </>
  );
}
