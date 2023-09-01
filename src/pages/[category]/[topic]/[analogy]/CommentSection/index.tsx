import { api } from "@/utils/api";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { CommentSkeleton } from "@/components/Loading/Skeleton";
import { AiFillLock as Lock } from "react-icons/ai";
import { SingleComment } from "./SingleComment";
import { CommentEditor } from "./CommentEditor";
import { type ExtendedComment, type ICommentSectionProps } from "../types";

export function CommentSection({ analogyId }: ICommentSectionProps) {
  const { status: sessionStatus } = useSession();
  const {
    data: comments,
    status: commentsFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.comment.getByAnalogyId.useInfiniteQuery(
    {
      id: analogyId as string,
      order: "desc",
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <div
      id="comments-section"
      className="mb-auto mt-8 rounded-md bg-[#d7d7d7] px-2 py-2 sm:rounded-[23px] sm:px-6"
    >
      <h2 className="text-md p-3 font-bold text-dark-2">Comments</h2>
      {commentsFetchingStatus === "loading" ? (
        <CommentSkeleton />
      ) : (
        <div id="comments">
          {comments?.pages && comments?.pages[0]?.items?.length ? (
            comments?.pages?.map((page) =>
              page?.items?.map((comment: ExtendedComment) => (
                <SingleComment comment={comment} key={comment.id} />
              ))
            )
          ) : (
            <div className="px-3 py-2 text-start text-sm text-gray-500">
              No comments yet
            </div>
          )}

          {hasNextPage && (
            <LoadMoreButton
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}

          {sessionStatus === "authenticated" ? (
            <CommentEditor analogyId={analogyId} />
          ) : (
            <div
              className={`my-4 flex w-full cursor-pointer select-none resize-none items-center rounded-lg border border-[#ffffff45] bg-[#ffffff45] px-3 py-2 text-sm text-gray-500 transition-all duration-200 hover:bg-[#ffffff6c] hover:text-gray-600`}
              onClick={() => void signIn()}
            >
              <Lock className="mb-0.5 mr-2" /> You need to be logged in to
              comment
            </div>
          )}
        </div>
      )}
    </div>
  );
}
