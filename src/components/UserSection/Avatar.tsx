import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FaRegUserCircle as EmptyAvatar } from "react-icons/fa";
import { getScreenName } from "@/utils/getScreenName";
import { USER } from ".";

export function Avatar({ user }: { user: USER }) {
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
            className="h-7 w-7 rounded-full  bg-[#F9F9F9] ring-2 ring-[#5858582b] transition-all hover:ring-gray-300 sm:h-9 sm:w-9"
            width={36}
            height={36}
            alt={`${getScreenName(user) ?? ""}'s image`}
          />
        </Link>
      ) : (
        <div className="my-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#95959521] shadow-sm transition-all hover:border-[#0000002c] sm:h-10 sm:w-10">
          <EmptyAvatar
            onClick={() => void signIn()}
            className="text-[#3f3f3f3d] sm:h-6  sm:w-6 "
          />
        </div>
      )}
    </>
  );
}
