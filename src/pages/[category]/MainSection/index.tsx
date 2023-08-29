import React from "react";
import { TopicsList } from "./TopicsList";
import { TableSkeleton } from "@/components/Loading/Skeleton";
import { EntityIsEmpty } from "@/components/Messages/EntityIsEmpty";
import { type IMainSectionProps } from "../types";

export function MainSection({
  categoryFetching,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  setTopicEditorState,
  setTopicInput,
  topicEditorState,
  topicsData,
  topicsFetchingStatus,
}: IMainSectionProps) {
  return (
    <div className="mx-auto mb-12 mt-8 flex justify-center sm:px-10 lg:px-[16.666667%] ">
      {/* handle loading states */}
      {categoryFetching ||
        (topicsFetchingStatus === "loading" && <TableSkeleton />)}

      {/* show a list of topics */}
      {topicsFetchingStatus === "success" &&
      topicsData?.pages &&
      topicsData?.pages[0]?.items?.length ? (
        <TopicsList
          topicsData={topicsData}
          hasNextPage={hasNextPage as boolean}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          setTopicInput={setTopicInput}
          setTopicEditorState={setTopicEditorState}
        />
      ) : null}

      {/* if there's no topic */}
      {topicsFetchingStatus === "success" &&
      topicsData &&
      topicsData.pages &&
      !topicsData?.pages[0]?.items?.length ? (
        <EntityIsEmpty
          entity="category"
          action={() => {
            setTopicEditorState({
              ...topicEditorState,
              shown: true,
              purpose: "Create",
            });
          }}
        />
      ) : null}
    </div>
  );
}
