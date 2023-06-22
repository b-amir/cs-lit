import Image from "next/image";
import { api } from "@/utils/api";
// import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function ProfilePopUp(props: {
  username: any;
  userSectionShown: any;
  setUserSectionShown: any;
}) {
  // the clerk way
  // const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  // the next-auth way
  const { data: sessionData } = useSession();

  // the clerk way
  // if (!userLoaded) return <></>;

  // const { data, isLoading: userLoading } =
  //   api.profile.getUserByUsername.useQuery({
  //     username: props.username,
  //   });

  return (
    <div
      id="top-right-modal"
      data-modal-placement="top-right"
      // tabIndex={-1}
      className={`fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 ${
        props.userSectionShown ? "" : " hidden"
      }`}
      onClick={() => props.setUserSectionShown(false)}
    >
      <div className="absolute right-2 top-[80px] max-h-full max-w-md">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b p-5 dark:border-gray-600">
            {/* <h3 className="text-s font-medium text-[#2A2A2E] dark:text-white"> */}
            {/* User Section */}
            <h3 className="text-xl font-medium text-[#2A2A2E] dark:text-white">
              {/* clerk way */}
              {/* {user?.username
                ? user?.username
                : user?.firstName
                ? user?.firstName
                : "User"} */}

              {/* next-auth way */}
              {sessionData?.user?.name
                ? sessionData?.user?.name
                : sessionData?.user?.email
                ? sessionData?.user?.email
                : "User"}
            </h3>
            {/* </h3> */}
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-[#2A2A2E] dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="top-right-modal"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span
                className="sr-only"
                onClick={() => props.setUserSectionShown(false)}
              >
                Close modal
              </span>
            </button>
          </div>
          <div className="space-y-6 p-6">
            {/* <p>You are signed in as </p> */}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {/* clerk way */}
              {/* {user?.fullName} */}

              {/* next-auth way */}
              {sessionData?.user?.name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {/* clerk way */}
              {/* {user?.emailAddresses[0]?.emailAddress} */}

              {/* next-auth way */}
              {sessionData?.user?.email}
            </p>
          </div>
          <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <Link
              href={`/profile/${sessionData?.user?.id}`}
              className="text-xs font-bold text-sky-500"
            >
              <button
                data-modal-hide="top-right-modal"
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-[#2A2A2E] focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                Your Analogies
              </button>
            </Link>

            {/* {isSignedIn && (
              <div className="flex">
                <SignOutButton>
                  <button
                    type="button"
                    className="mr-2 inline-flex items-center rounded-lg bg-black p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      fill="#fff"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="170 120 160.05 160"
                      stroke="#fff"
                      stroke-width=".005"
                    >
                      <g stroke-width="0" />
                      <g
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke="#CCC"
                        stroke-width="10"
                      />
                      <path d="M250 224c-4.4 0-8 3.6-8 8v24c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8V144c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v24c0 4.4 3.6 8 8 8s8-3.6 8-8v-24c0-13.2-10.8-24-24-24h-40c-13.2 0-24 10.8-24 24v112c0 13.2 10.8 24 24 24h40c13.2 0 24-10.8 24-24v-24c0-4.4-3.6-8-8-8z" />
                      <path d="m328.4 204.8.3-.3v-.1l.3-.6c.1-.3.3-.5.4-.8.1-.3.2-.5.3-.8.1-.2.2-.4.2-.7.2-1 .2-2.1 0-3.1 0-.2-.1-.4-.2-.7-.1-.3-.1-.5-.2-.8-.1-.3-.3-.5-.4-.8l-.3-.6c-.3-.4-.6-.9-1-1.2l-32-32c-3.1-3.1-8.2-3.1-11.3 0-3.1 3.1-3.1 8.2 0 11.3l18.3 18.3H210c-4.4 0-8 3.6-8 8s3.6 8 8 8h92.7l-18.3 18.3c-3.1 3.1-3.1 8.2 0 11.3 1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l32-32c.1-.1.3-.4.6-.7z" />
                    </svg>
                    <span className="sr-only">Icon description</span>
                  </button>
                </SignOutButton>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
