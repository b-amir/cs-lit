import React from "react";
import { signIn } from "next-auth/react";
import { AiFillLock as Lock } from "react-icons/ai";

export function NotSignedIn() {
  return (
    <div className="mt-auto grid h-full grid-cols-1 gap-x-6 gap-y-14 rounded-[12px] border border-[#c8c8c8] bg-[#ebeaea] px-6 py-12 transition-all duration-300 hover:border-[#c1c1c1]">
      <div className="flex select-none flex-col items-center justify-center text-gray-500">
        <Lock />
        <span
          className="mt-2 cursor-pointer select-none transition-all hover:text-gray-700"
          onClick={() => void signIn()}
        >
          You need to sign in.
        </span>
      </div>
    </div>
  );
}
