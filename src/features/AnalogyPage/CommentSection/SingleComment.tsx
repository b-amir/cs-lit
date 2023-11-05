import Link from "next/link";
import Image from "next/image";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import { RelativeTime } from "../../../utils/relativeTime";
import { getScreenName } from "@/utils/getScreenName";
import { type ExtendedComment } from "../types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { User } from "@prisma/client";

export function SingleComment({ comment }: { comment: ExtendedComment }) {
  return (
    <div
      key={comment.id}
      id="single-comment"
      className="mb-3 rounded-lg border border-[#f6f6f652] bg-[#f0f0f0a1] px-2 py-2 duration-200 hover:bg-[#f6f6f6] "
    >
      <div className="flex items-center gap-1">
        <Link
          href={`/profile/${comment.commenterId}`}
          id="commenter"
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
            {getScreenName(comment.user as User)}
          </div>
        </Link>
        <div id="time" className="mt-0.5 text-xs font-normal text-slate-400">
          {RelativeTime(comment.createdAt)}
        </div>
      </div>
      <div
        id="comment-body"
        className="prose px-2 py-2 text-sm prose-code:whitespace-pre-wrap  prose-code:break-words prose-code:rounded-md prose-code:bg-gray-4 prose-code:px-2 prose-code:py-1 prose-code:text-gray-500 prose-pre:border"
      >
        <ReactMarkdown
          className="prose-code:dark:text-gray-30 prose mx-auto  text-ellipsis break-words prose-pre:bg-gray-4 prose-pre:p-0"
          // eslint-disable-next-line react/no-children-prop
          children={comment.content}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                    padding: "0em",
                    margin: "0.8em",
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
