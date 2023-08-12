/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CgSpinner } from "react-icons/cg";
import React from "react";
import Link from "next/link";
import { getStatusIcon } from "@/utils/getStatusIcon";
import { RelativeTime } from "@/utils/relativeTime";
import { type Topic } from "@prisma/client";
import { useSession } from "next-auth/react";
import { LoadMoreButton } from "@/components/LoadMoreButton";

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
      entity: null | "analogy" | "topic";
      shown: boolean;
      purpose: "Create" | "Edit" | null;
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
    <div className="relative w-full overflow-x-auto rounded-[12px] border border-[#cdcdcd7d] bg-gray-50 shadow-sm">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="border-b  text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                          setTopicEditorState({
                            entity: "topic",
                            shown: true,
                            purpose: "Edit",
                          });
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
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}
