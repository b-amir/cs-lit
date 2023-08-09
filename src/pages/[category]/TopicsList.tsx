/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CgSpinner } from "react-icons/cg";
import React from "react";
import Link from "next/link";
import { getStatusIcon } from "@/utils/getStatusIcon";
import { RelativeTime } from "@/utils/relativeTime";
import { type Topic } from "@prisma/client";
import { useSession } from "next-auth/react";

export interface ITopicsListProps {
  topicsData: { pages: { items: Topic[] }[] };
  UrlCategory: string;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  setTopicInput: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      url: string;
      category: string;
      slug: string;
      status: string;
      firstAnalogy: string;
    }>
  >;
  setTopicEditorState: React.Dispatch<
    React.SetStateAction<{
      shown: boolean;
      purpose: "create" | "edit" | null;
    }>
  >;
}

export function TopicsList({
  topicsData,
  UrlCategory,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  setTopicInput,
  setTopicEditorState,
}: ITopicsListProps): React.ReactNode {
  const { data: sessionData } = useSession();

  return (
    <div className="relative w-full overflow-x-auto rounded-[12px] border border-[#cdcdcd7d] shadow-sm">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="border-b bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-full px-6 py-3">
              Topic
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Status</span>
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              last update
            </th>
            {sessionData &&
              ["ADMIN", "EDITOR"].includes(sessionData?.user.role) && (
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              )}
          </tr>
        </thead>
        <tbody>
          {topicsData?.pages?.map((page) =>
            page?.items?.map((topic: Topic) => (
              <tr
                key={topic.id}
                className="border-b bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
              >
                <Link href={`${UrlCategory}/${topic.slug}`} className="">
                  <th
                    scope="row"
                    className="max-w-[360px] cursor-pointer overflow-clip overflow-ellipsis whitespace-nowrap px-6 py-6 text-base font-medium text-[#2A2A2E] dark:text-white"
                  >
                    {topic.title}
                  </th>
                </Link>
                <td className="px-6 py-4">{getStatusIcon(topic.status)}</td>
                <td className="w-3/12 px-1 py-4 text-center text-xs">
                  {RelativeTime(topic.updatedAt)}
                  {/* {new Date(topic.updatedAt).toLocaleDateString()} */}
                </td>
                {sessionData &&
                  ["ADMIN", "EDITOR"].includes(sessionData?.user.role) && (
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-gray-400 hover:underline dark:text-gray-300"
                        onClick={(e) => {
                          e.preventDefault();
                          setTopicEditorState({ shown: true, purpose: "edit" });
                          setTopicInput((prev) => {
                            return {
                              ...prev,
                              id: topic.id,
                              title: topic.title,
                              categoryId: topic.categoryId,
                              status: topic.status,
                              url: topic.url,
                              slug: topic.slug,
                            };
                          });
                        }}
                      >
                        Edit
                      </a>
                    </td>
                  )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Load more button */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full"
        >
          <div className="flex w-full items-center justify-center border-t border-t-[#5555551d] bg-[#fff]  py-6 font-semibold text-gray-500 shadow-[0px_2px_20px_0px_#00000010_inset] transition-all duration-300 hover:bg-gradient-to-b hover:from-[#efefefb5] hover:to-white hover:text-gray-800">
            {isFetchingNextPage ? (
              <CgSpinner className=" animate-spin " />
            ) : (
              "Load more"
            )}
          </div>
        </button>
      )}
    </div>
  );
}
