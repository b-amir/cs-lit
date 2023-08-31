/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import React from "react";
import { type Topic } from "@prisma/client";
import { useSession } from "next-auth/react";
import { RelativeTime } from "@/utils/relativeTime";
import { routeHandler } from "@/utils/routeHandler";
import { getStatusIcon } from "@/utils/getStatusIcon";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import {
  type INormalRowProps,
  type ITitleRowProps,
  type ITopicsListProps,
} from "../types";

export function TopicsList({
  topicsData,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  setTopicInput,
  setTopicEditorState,
}: ITopicsListProps) {
  const { data: sessionData } = useSession();

  const handleEdit = (e: React.MouseEvent, topic: Topic) => {
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
  };

  return (
    <div
      id="topics-list"
      className="relative flex w-full flex-col overflow-x-clip rounded-[12px] border border-[#cdcdcd7d] bg-gray-50 shadow-sm"
    >
      <div className="flex w-full flex-col text-left text-sm text-gray-500">
        <TitleRow sessionData={sessionData} />
        <NormalRow
          handleEdit={handleEdit}
          sessionData={sessionData}
          topicsData={topicsData}
        />
      </div>
      {hasNextPage && (
        <LoadMoreButton
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}

function TitleRow({ sessionData }: ITitleRowProps) {
  return (
    <div
      id="title-row"
      className="flex  w-full justify-between border-b text-[0.68rem] font-semibold uppercase text-gray-700"
    >
      <span className="w-6/12 px-6 py-3">Topic</span>
      <span className="w-1/12 px-1 py-3">
        <span className="sr-only">Status</span>
      </span>
      <span className="hidden w-2/12  justify-center px-1 py-3 text-center sm:flex">
        last update
      </span>
      {sessionData && ["ADMIN", "EDITOR"].includes(sessionData?.user.role) && (
        <span className="w-1/12 px-1  py-3">
          <span className="sr-only">Edit</span>
        </span>
      )}
    </div>
  );
}

function NormalRow({ handleEdit, sessionData, topicsData }: INormalRowProps) {
  return (
    <div id="normal-row" className="flex flex-col">
      {topicsData?.pages?.map((page) =>
        page?.items?.map((topic: Topic) => (
          <Link
            key={topic.id}
            href={`${routeHandler(topic, "Topics") ?? ""}`}
            className="flex  w-full  items-center justify-between border-b bg-white hover:bg-gray-100"
          >
            <span className="w-6/12 cursor-pointer overflow-clip overflow-ellipsis whitespace-nowrap px-6 py-6 text-base font-medium text-[#2A2A2E]">
              {topic.title}
            </span>
            <span className="w-1/12  px-1 py-4">
              {getStatusIcon(topic.status)}
            </span>
            <span className="hidden  w-2/12 items-center justify-center px-1 py-4 text-xs sm:flex">
              {RelativeTime(topic.updatedAt)}
            </span>
            {sessionData &&
              ["ADMIN", "EDITOR"].includes(sessionData?.user.role) && (
                <span className="flex w-1/12 items-center justify-center  px-1 py-4 text-center">
                  <a
                    href="#"
                    className="font-medium text-gray-400 hover:underline"
                    onClick={(e) => handleEdit(e, topic)}
                  >
                    Edit
                  </a>
                </span>
              )}
          </Link>
        ))
      )}
    </div>
  );
}