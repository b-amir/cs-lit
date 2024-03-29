import React from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { MultilineSkeleton } from "../Loading/Skeleton";
import { type IContentSectionProps } from "./types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export function ContentSection({
  analogyData,
  analogyStatus,
}: IContentSectionProps) {
  // --- Dynamically importing the react-markdown causes a flash of unstyled content.
  // --- disabling the dynamic import, in favor of better UX, for now.
  // const ReactMarkdown = dynamic(() => import("react-markdown"));

  return (
    <div
      id="analogy-content"
      data-testid="analogy-content"
      className="min-h-[120px] w-full  bg-white px-8 pb-12 pt-8"
    >
      {analogyStatus === "loading" || !analogyData ? (
        <MultilineSkeleton />
      ) : (
        <ReactMarkdown
          className="prose-code:dark:text-gray-30 prose mx-auto text-ellipsis break-words prose-pre:bg-[#101A25]"
          // eslint-disable-next-line react/no-children-prop
          children={analogyData?.description ?? ""}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, "")}
                  style={coldarkDark}
                  wrapLongLines={true}
                  wrapLines={true}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    padding: "0em !important",
                    margin: "0em !important",
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
      )}
    </div>
  );
}
