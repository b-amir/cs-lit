import React from "react";
import { TopicsList } from "./TopicsList";
import { TableSkeleton } from "@/components/Loading/Skeleton";
import { EntityIsEmpty } from "@/components/Messages/EntityIsEmpty";
import { setTopicInput } from "@/features/EditorSection/inputSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setPurpose, setShown } from "@/features/EditorSection/editorSlice";
import { type IMainSectionProps } from "../types";

export function MainSection({
  categoryFetching,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  topicsData,
  topicsFetchingStatus,
  newInput,
}: IMainSectionProps) {
  const dispatch = useAppDispatch();

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
            dispatch(setPurpose("Create"));
            dispatch(setShown(true));
            // @ts-ignore
            dispatch(setTopicInput(newInput));
          }}
        />
      ) : null}
    </div>
  );
}
