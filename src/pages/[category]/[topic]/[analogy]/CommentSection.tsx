import { api } from "@/utils/api";
import { AiFillLock } from "react-icons/ai";
import { useEffect, useState } from "react";
import Link from "next/link";
import { type Comment } from "@prisma/client";
import { RelativeTime } from "../../../../utils/relativeTime";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CommentSkeleton } from "@/components/Skeleton";
import { useCreateItem } from "@/hooks/useCreateItem";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export function CommentSection({ analogyId }: { analogyId: string }) {
  const { status: sessionStatus } = useSession();
  const {
    data: comments,
    status: commentsFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.comment.getByAnalogyId.useInfiniteQuery(
    {
      id: analogyId,
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
      <h2 className="text-md p-3 font-bold text-[#2A2A2E]">Comments</h2>
      {commentsFetchingStatus === "loading" ? (
        <CommentSkeleton />
      ) : (
        <div id="comments">
          {comments?.pages[0]?.total > 0 ? (
            comments?.pages?.map((page) =>
              page?.items?.map((comment: Comment) => (
                <SingleComment comment={comment} />
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
              onClick={() => signIn()}
            >
              <AiFillLock className="mb-0.5 mr-2" /> You need to be logged in to
              comment
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function SingleComment({ comment }: { comment: Comment }) {
  return (
    <div
      key={comment.id}
      id="single-comment"
      className="mb-3 rounded-lg border border-[#f6f6f652] bg-[#f0f0f0a1] px-2 py-2 duration-200 hover:bg-[#f6f6f6] "
    >
      <div className="flex items-center gap-1">
        <Link
          href={`/profile/${comment.commenterId}`}
          id="commentor"
          className="inline-flex cursor-pointer  gap-2 rounded-md px-2 py-1 transition-all hover:bg-white"
        >
          <Image
            id="avatar"
            src={
              comment?.user?.image
                ? comment?.user?.image
                : "/assets/defaultpp.svg"
            }
            width={18}
            height={18}
            alt="avatar"
            className="rounded-full"
          />
          <div
            id="name"
            className="mt-0.5 text-xs font-semibold text-slate-700"
          >
            {comment.user.name ? comment.user.name : comment.user.email}
          </div>
        </Link>
        <div id="time" className="mt-0.5 text-xs font-normal text-slate-400">
          {RelativeTime(comment.createdAt)}
        </div>
      </div>
      <div
        id="comment-body"
        className="prose px-2 py-2 text-sm prose-code:whitespace-pre-wrap  prose-code:break-words prose-code:rounded-md prose-code:bg-[#FDFDFD] prose-code:px-2 prose-code:py-1 prose-code:text-gray-500 prose-pre:border"
      >
        <ReactMarkdown
          className="prose-code:dark:text-gray-30 prose mx-auto  text-ellipsis break-words prose-pre:bg-[#FDFDFD] prose-pre:p-0"
          // eslint-disable-next-line react/no-children-prop
          children={comment.content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, "")}
                  style={coy}
                  wrapLongLines={true}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    padding: "1.1em",
                  }}
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
}
function CommentEditor({ analogyId }: { analogyId: string }) {
  const [commentInput, setCommentInput] = useState({
    content: "",
    analogyId: analogyId,
  });

  // --- getting analogyId at first page load --- //
  useEffect(() => {
    if (analogyId) {
      setCommentInput({ ...commentInput, analogyId: analogyId });
    }
  }, []);
  const item = commentInput as Comment;
  const type = "Comments";

  const createItem = useCreateItem(item, type);
  const handleCreate = (e) => {
    e.preventDefault();
    setCommentInput({ analogyId: analogyId, content: "" });
    createItem();
  };

  return (
    <div id="comment-editor">
      <form
        action=""
        className="my-4 flex flex-col hover:border-gray-400 focus:shadow-sm"
      >
        <textarea
          id="comment-input"
          className={`w-full cursor-pointer resize-none border border-[#ffffff45] bg-[#ffffff45] px-3 py-2 text-sm placeholder-gray-500 transition-all duration-200 hover:bg-[#ffffff6c] focus:cursor-text focus:bg-white focus:outline-none ${
            commentInput.content.trim() === "" ? "rounded-md" : "rounded-t-md"
          }`}
          placeholder="Write your comment here..."
          rows={commentInput.content.trim() === "" ? 1 : 3}
          value={commentInput.content}
          onChange={(e) =>
            setCommentInput({
              ...commentInput,
              content: e.target.value,
            })
          }
        />

        {commentInput.content.trim() === "" ? null : (
          <button
            type="submit"
            className="w-full rounded-b-md border-t border-[#55545432] border-gray-300 bg-gray-100 py-2 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-200 "
            onClick={handleCreate}
          >
            send
          </button>
        )}
      </form>
    </div>
  );
}
