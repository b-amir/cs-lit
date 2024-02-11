import Link from "next/link";
import React from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { RelativeTime } from "@/utils/relativeTime";
import { AiOutlineLink } from "react-icons/ai";
import { getStatusIcon } from "@/utils/getStatusIcon";
import { HiOutlineChatAlt } from "react-icons/hi";
import { type ExtendedAnalogy } from "../PageLayout/SidebarRight/types";
import { setPurpose, setShown } from "@/features/EditorSection/editorSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { HiOutlineDotsVertical as DotsMenu } from "react-icons/hi";
import {
  type IPostTimeProps,
  type IInfoRowSectionProps,
  type IPostCommentCountProps,
  type IPostEditButtonProps,
} from "./types";
import {
  setAnalogyDescription,
  setAnalogyInput,
  setAnalogyTopicId,
} from "@/features/EditorSection/inputSlice";

export function InfoRowSection({
  needsLocationInfo,
  analogyData,
}: IInfoRowSectionProps) {
  const { data: sessionData } = useSession();

  // --- get comments from api --- //
  const { data: commentsData } = api.comment.getByAnalogyId.useInfiniteQuery(
    {
      id: analogyData?.id as string,
      order: "desc",
      limit: 10,
    },
    { enabled: !!analogyData?.id }
  );

  return (
    <div
      id="analogy-info-row"
      className="flex h-12 w-full cursor-default items-center justify-start"
    >
      <span className="flex shrink-0 grow">
        {analogyData ? <PostTime analogyData={analogyData} /> : null}

        {/*  if needed, show where analogy is posted. ex: in profile page */}
        {analogyData && needsLocationInfo ? (
          <PostLocation analogyData={analogyData} />
        ) : null}

        {/* if there's a reference */}
        {analogyData?.reference ? (
          <PostReference analogyData={analogyData} />
        ) : null}

        {/* if analogy has comments */}
        {commentsData?.pages?.[0] && commentsData.pages[0].total > 0 ? (
          <PostCommentCount
            analogyData={analogyData}
            commentsData={commentsData}
          />
        ) : null}

        <PostStatus analogyData={analogyData} />
      </span>
      <span className="shrink grow-0">
        <PostEditButton analogyData={analogyData} sessionData={sessionData} />
      </span>
    </div>
  );
}

// -------------------------------- //
// --- Available Badge Options: --- //
// -------------------------------- //
function PostTime({ analogyData }: IPostTimeProps) {
  return (
    <div
      className="mx-2 flex rounded-lg border bg-gray-100 px-3 py-1 text-xs text-gray-500 hover:border-gray-300 hover:bg-[#e9e9e988]"
      // href={`${routeHandler(analogyData, "Analogies") ?? ""}`}
    >
      {analogyData && RelativeTime(analogyData.createdAt)}
    </div>
  );
}
function PostLocation({
  analogyData,
}: {
  analogyData: ExtendedAnalogy | undefined;
}) {
  return (
    <div className="mx-2 flex text-ellipsis rounded-lg border bg-gray-100 px-3 py-1 text-xs text-gray-500 hover:border-gray-300 hover:bg-[#e9e9e988]">
      <span className=" font-normal ">about&nbsp;</span>
      <Link
        className="flex cursor-pointer items-center  truncate align-middle font-semibold transition-all hover:text-gray-800"
        href={`/${analogyData?.category?.slug ?? "#"}/${
          analogyData?.topic?.slug ?? "#"
        }`}
      >
        {analogyData?.topic?.title}
      </Link>
      <span className=" font-normal">&nbsp;in&nbsp;</span>
      <Link
        className="flex cursor-pointer items-center align-middle font-semibold transition-all hover:text-gray-800"
        href={`/${analogyData?.category?.slug ?? "#"}`}
      >
        {analogyData?.category?.name}
      </Link>
    </div>
  );
}
function PostReference({
  analogyData,
}: {
  analogyData: ExtendedAnalogy | undefined;
}) {
  return (
    <Link
      href={`${analogyData?.reference ?? "#"}`}
      target="_blank"
      className="mx-2 flex cursor-pointer rounded-lg border bg-indigo-50 px-3 py-1 text-xs text-indigo-600 hover:border-indigo-300 hover:bg-indigo-100"
      onClick={(e) => e.stopPropagation()}
    >
      <AiOutlineLink className="mr-2 mt-0.5 scale-125" /> reference
    </Link>
  );
}
function PostCommentCount({
  analogyData,
  commentsData,
}: IPostCommentCountProps) {
  return (
    <Link
      href={`/${analogyData?.category?.slug ?? "#"}/${
        analogyData?.topic?.slug ?? "#"
      }/${analogyData?.id ?? "#"}`}
      className="mx-2 flex cursor-pointer rounded-lg border bg-cyan-50 px-3 py-1 text-xs text-cyan-600 hover:border-cyan-300 hover:bg-cyan-100"
    >
      <HiOutlineChatAlt className="mr-2 mt-0.5 scale-125" />{" "}
      {commentsData?.pages ? commentsData?.pages[0]?.total : 0}
    </Link>
  );
}
function PostStatus({
  analogyData,
}: {
  analogyData: ExtendedAnalogy | undefined;
}) {
  return <span>{getStatusIcon(analogyData?.status ?? "")}</span>;
}
function PostEditButton({ analogyData, sessionData }: IPostEditButtonProps) {
  //
  const editor = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();
  const handleEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(setPurpose("Edit"));
    dispatch(setShown(!editor.shown));
    // @ts-ignore
    dispatch(setAnalogyInput(analogyData));
  };

  return (
    <>
      {sessionData &&
        ["ADMIN", "EDITOR"].includes(sessionData?.user.role ?? "") && (
          <button
            className="font-medium text-gray-400 hover:underline"
            onClick={handleEdit}
          >
            <span className="mx-2 flex cursor-pointer rounded-lg border border-transparent p-1 text-xs text-gray-600 hover:border-gray-300 hover:bg-gray-100">
              <DotsMenu className="mt-0.5 scale-125" />
            </span>
          </button>
        )}
    </>
  );
}
