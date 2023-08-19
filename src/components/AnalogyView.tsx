import Link from "next/link";
import Image from "next/image";
import { Voting } from "./Voting";
// import router, { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";
import { MultilineSkeleton } from "./Skeleton";
import { SmallSkeleton } from "./Skeleton";
import { MediumSkeleton } from "./Skeleton";
import { AvatarSkeleton } from "./Skeleton";
import { AiOutlineLink } from "react-icons/ai";
import { HiOutlineChatAlt } from "react-icons/hi";
import { getStatusIcon } from "@/utils/getStatusIcon";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RelativeTime } from "@/utils/relativeTime";
import router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface IAnalogyViewProps {
  analogy: {
    id: string;
  };
  needsInfoRow?: boolean;
  needsLink?: boolean;
  needsLocationInfo?: boolean;
  setAnalogyEditorState: React.Dispatch<
    React.SetStateAction<{
      entity: string;
      shown: boolean;
      purpose: string;
    }>
  >;
  setAnalogyInput: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      description: string;
      reference: string;
      status: string;
      pinned: boolean;
      topicId: string;
      authorId: string;
    }>
  >;
  analogyData: {
    id: string;
    title: string;
    description: string;
    reference: string;
    status: string;
    pinned: boolean;
    topicId: string;
    authorId: string;
    category: {
      slug: string;
      name: string;
    };
    topic: {
      slug: string;
      title: string;
    };
    comments: {
      pages: {
        total: number;
      }[];
    };
    createdAt: Date;
    user: {
      image: string;
      name: string;
      email: string;
    };
  };
  analogyStatus?: string;
  votingAverage?: number;
  votingStatus?: string;
}
export const AnalogyView: React.FC<IAnalogyViewProps> = (props) => {
  const {
    setAnalogyInput,
    setAnalogyEditorState,
    analogy,
    needsLocationInfo = false,
    needsInfoRow = true,
    needsLink = false,
  } = props;

  // Get the analogy data for the current analogy
  const { data: analogyData, status: analogyStatus } =
    api.analogy.getById.useQuery(
      {
        id: analogy.id,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        manual: true,
      }
    );

  // Get the analogy votes for the current analogy
  const { data: analogyVotesData, status: votingStatus } =
    api.analogy.getAnalogyVotes.useQuery(
      {
        analogyId: analogy.id,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        manual: true,
      }
    );

  // analogyLink is used to link to the analogy, and is constructed from the data provided by the API.
  const analogyLink = `/${analogyData?.category?.slug}/${analogyData?.topic?.slug}/${analogyData?.id}`;

  // votingAverage is used to display the average vote for the analogy.
  const [votingAverage, setVotingAverage] = useState(0);

  // We can use the `useEffect` hook to run code after the first render.
  useEffect(() => {
    // The `analogyVotesData` variable will be `null` until the
    // `analogyVotesQuery` has finished loading.
    if (!analogyVotesData) {
      return;
    }

    // Calculate the total votes, and the difference between the
    // likes and dislikes.
    const totalVotes = analogyVotesData.likes + analogyVotesData.dislikes;
    const voteDifference = analogyVotesData.likes - analogyVotesData.dislikes;

    // Calculate the average vote. We use this to calculate the
    // reputation of the analogy.
    const voteAverage = voteDifference / totalVotes;

    // Round the average vote to the nearest whole number to get
    // the reputation.
    const analogyReputation = Math.round(voteAverage * 2);

    // Set the reputation.
    setVotingAverage(analogyReputation);
  }, [analogyVotesData]);

  analogyStatus === "loading" && <div>Loading...</div>;
  const analogyViewProps: IAnalogyViewProps = {
    analogy,
    analogyData,
    analogyStatus,
    needsInfoRow,
    needsLocationInfo,
    setAnalogyEditorState,
    setAnalogyInput,
    votingAverage,
    votingStatus,
  };

  return (
    <>
      {needsLink ? (
        <Link href={analogyLink} className="mx-auto w-full max-w-[705px]">
          <AnalogyBody {...analogyViewProps} />
        </Link>
      ) : (
        <AnalogyBody {...analogyViewProps} />
      )}
    </>
  );
};
function AnalogyBody({
  analogy,
  analogyData,
  analogyStatus,
  needsInfoRow,
  needsLocationInfo,
  setAnalogyEditorState,
  setAnalogyInput,
  votingAverage,
  votingStatus,
}) {
  return (
    <div
      key={analogy?.id}
      className=" z-20  mx-auto my-5 flex  w-full max-w-[705px] flex-col overflow-clip rounded-[17px] 
    border border-gray-200 bg-white px-0 py-0 shadow-lg transition-all hover:border-[#c1c1c1] "
    >
      <div
        className="border-b-1 w-full cursor-default border border-x-0 border-t-0 border-gray-200 bg-[#F9F9F9] px-5 py-4 
      shadow-[inset_0px_-3px_1px_0px_#00000003]"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between align-middle">
          <div className="flex items-center justify-between align-middle">
            {analogyStatus === "loading" ? (
              <AvatarSkeleton />
            ) : (
              <Link
                href={`/profile/${analogyData?.authorId}`}
                className="flex items-center align-middle text-xs "
              >
                <Image
                  src={analogyData?.user?.image || "/assets/defaultpp.svg"}
                  className="ml-1 mr-4 h-8 w-8 rounded-full ring-[3px] ring-[#b2b2b232] transition-all duration-300 hover:ring-[#80808073]"
                  alt={"Profile Picture"}
                  width={42}
                  height={42}
                />{" "}
              </Link>
            )}

            <div>
              {analogyStatus === "loading" ? (
                <MediumSkeleton />
              ) : (
                <div
                  id="analogy-author"
                  className="flex items-center justify-between pb-0.5 align-middle font-normal  text-[#666666]"
                >
                  <Link
                    href={`/profile/${analogyData?.authorId}`}
                    className="flex items-center align-middle text-sm transition-all hover:text-gray-800"
                  >
                    {
                      analogyData?.user?.name
                        ? analogyData?.user?.name
                        : analogyData?.user?.email
                      // ? author?.email
                      // : "Anonymous"
                    }
                  </Link>
                  <span className="text-sm font-normal">&apos;s analogy</span>
                </div>
              )}

              {votingStatus === "loading" ? (
                <SmallSkeleton />
              ) : (
                <div
                  id="votingAverage"
                  className="flex items-start justify-start  text-xs text-[#878787]"
                >
                  {
                    // check if votingAverage is not NaN
                    isNaN(votingAverage) ? (
                      <>has no votes yet</>
                    ) : (
                      <>
                        {votingAverage === -2 ? (
                          <span className="text-[#b95353]">
                            Needs improvement
                          </span>
                        ) : votingAverage === -1 ? (
                          <span>
                            is&nbsp;
                            <span className="text-[#ac7e46]">Half decent</span>
                          </span>
                        ) : votingAverage === 0 ? (
                          <span>
                            is&nbsp;
                            <span className="text-[#38a169]">Appreciated</span>
                          </span>
                        ) : votingAverage === 1 ? (
                          <span>
                            is&nbsp;
                            <span className="text-[#5ab2a9]">Awesome</span>
                          </span>
                        ) : votingAverage === 2 ? (
                          <span>
                            is&nbsp;
                            <span className="text-[#3ba44e]">Superb</span>
                          </span>
                        ) : (
                          <span />
                        )}
                      </>
                    )
                  }
                </div>
              )}
            </div>
          </div>

          <Voting analogyId={analogy.id} />
        </div>
      </div>

      <div
        id="analogy-content"
        className="min-h-[120px] w-full  bg-white px-8 pb-12 pt-8"
      >
        {analogyStatus === "loading" ? (
          <MultilineSkeleton />
        ) : (
          <ReactMarkdown
            className="prose-code:dark:text-gray-30 prose mx-auto text-ellipsis break-words prose-pre:bg-[#101A25]"
            // eslint-disable-next-line react/no-children-prop
            children={analogyData?.description}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, "")}
                    style={coldarkDark}
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
        )}
      </div>

      {needsInfoRow ? (
        <div
          id="analogy-chin"
          className="flex h-12 w-full cursor-default items-center justify-start rounded-b-[17px] border-t 
    bg-gray-50 px-1 shadow-[inset_0px_3px_1px_0px_#00000003]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AnalogyInfoRow
            needsLocationInfo={needsLocationInfo}
            analogyData={analogyData}
            setAnalogyInput={setAnalogyInput}
            setAnalogyEditorState={setAnalogyEditorState}
          />
        </div>
      ) : null}
    </div>
  );
}
interface IAnalogyInfoRowProps {
  needsLocationInfo: boolean;
  analogyData: object;
}
export function AnalogyInfoRow({
  needsLocationInfo,
  analogyData,
  setAnalogyInput,
  setAnalogyEditorState,
}: IAnalogyInfoRowProps) {
  const { data: sessionData } = useSession();

  // --- if info row is placed outside analogyView,
  //     then it has to get url params router rather than analogyData --- //
  const router = useRouter();
  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
    id: UrlProfile,
  } = router.query;

  // --- get comments from api --- //
  const { data: comments, status: commentsFetchingStatus } =
    api.comment.getByAnalogyId.useInfiniteQuery(
      {
        id: analogyData?.id as string,
        order: "desc",
        limit: 10,
      },
      {}
    );

  return (
    <>
      {/* {visibleItems > 0 ? ( */}
      <div
        id="analogy-info-row"
        className="flex h-12 w-full cursor-default items-center justify-start"
      >
        <span className="flex shrink-0 grow">
          <Link
            href={`/${analogyData?.category?.slug ?? UrlCategory}/${
              analogyData?.topic?.slug ?? UrlTopic
            }/${analogyData?.id ?? UrlAnalogyId}`}
            className="mx-2 flex rounded-lg border bg-gray-100 px-3 py-1 text-xs text-gray-500 hover:border-gray-300 hover:bg-[#e9e9e988]"
          >
            {analogyData && RelativeTime(analogyData.createdAt)}
          </Link>

          {/* where analogy is posted */}
          {needsLocationInfo ? (
            <div className="mx-2 flex max-w-[15rem] overflow-clip truncate text-ellipsis rounded-lg border bg-gray-100 px-3 py-1 text-xs text-gray-500 hover:border-gray-300 hover:bg-[#e9e9e988]">
              <span className="  font-normal ">about&nbsp;</span>
              <Link
                href={`/${analogyData?.category?.slug}/${analogyData?.topic?.slug}`}
                className="flex max-w-[5rem] cursor-pointer items-center  overflow-clip text-ellipsis  align-middle  font-semibold  transition-all hover:text-gray-800"
              >
                {analogyData?.topic?.title}
              </Link>
              <span className=" font-normal">&nbsp;in&nbsp;</span>
              <Link
                href={`/${analogyData?.category?.slug}`}
                className="flex  max-w-[5rem] cursor-pointer  items-center truncate align-middle  font-semibold   transition-all hover:text-gray-800"
              >
                {analogyData?.category?.name}
              </Link>
            </div>
          ) : null}

          {/* wether there's a reference */}
          {analogyData?.reference ? (
            <Link
              href={`${analogyData?.reference}`}
              className="mx-2 flex cursor-pointer rounded-lg border bg-indigo-50 px-3 py-1 text-xs text-indigo-600 hover:border-indigo-300 hover:bg-indigo-100"
            >
              <AiOutlineLink className="mr-2 mt-0.5 scale-125" /> reference
            </Link>
          ) : null}

          {/* if analogy has comments */}
          {comments?.pages[0]?.total > 0 ? (
            <Link
              href={`/${analogyData?.category?.slug ?? UrlCategory}/${
                analogyData?.topic?.slug ?? UrlTopic
              }/${analogyData?.id ?? UrlAnalogyId}`}
              className="mx-2 flex cursor-pointer rounded-lg border bg-cyan-50 px-3 py-1 text-xs text-cyan-600 hover:border-cyan-300 hover:bg-cyan-100"
            >
              <HiOutlineChatAlt className="mr-2 mt-0.5 scale-125" />{" "}
              {comments?.pages ? comments?.pages[0]?.total : 0}
            </Link>
          ) : null}

          {/* if status is not published */}
          <span>{getStatusIcon(analogyData?.status)}</span>
        </span>
        <span className="shrink grow-0">
          {sessionData &&
            setAnalogyEditorState &&
            ["ADMIN", "EDITOR"].includes(sessionData?.user.role) && (
              <a
                href="#"
                className="font-medium text-gray-400 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setAnalogyEditorState({
                    entity: "analogy",
                    shown: true,
                    purpose: "Edit",
                  });
                  setAnalogyInput((prev) => {
                    return {
                      ...prev,
                      id: analogyData.id,
                      title: analogyData.title,
                      description: analogyData.description,
                      reference: analogyData.reference,
                      status: analogyData.status,
                      pinned: analogyData.pinned,
                      topicId: analogyData.topicId,
                      authorId: analogyData.authorId,
                    };
                  });
                }}
              >
                <span className="mx-2 flex cursor-pointer rounded-lg border border-transparent p-1 text-xs text-gray-600 hover:border-gray-300 hover:bg-gray-100">
                  <HiOutlineDotsVertical className="mt-0.5 scale-125" />{" "}
                </span>
              </a>
            )}
        </span>{" "}
      </div>
      {/* ) : null} */}
    </>
  );
}
