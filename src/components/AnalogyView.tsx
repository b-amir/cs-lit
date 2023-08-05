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

interface IAnalogyViewProps {
  analogy: {
    id: string;
  };
  needsLocationInfo?: boolean;
}
export const AnalogyView: React.FC<IAnalogyViewProps> = (props) => {
  const { analogy, needsLocationInfo = false } = props;

  const { data: analogyVotesData, status: votingStatus } =
    api.analogy.getAnalogyVotes.useQuery({
      analogyId: analogy.id,
    });

  const { data: analogyData, status: analogyStatus } =
    api.analogy.getById.useQuery({
      id: analogy.id,
    });

  // console.log("analogyData:", analogyData);

  const [votingAverage, setVotingAverage] = useState(0);

  useEffect(() => {
    if (analogyVotesData) {
      const totalVotes = analogyVotesData.likes + analogyVotesData.dislikes;
      const voteDifference = analogyVotesData.likes - analogyVotesData.dislikes;
      const voteAverage = voteDifference / totalVotes;
      const analogyReputation = Math.round(voteAverage * 2);
      setVotingAverage(analogyReputation);
    }
  }, [analogyVotesData]);

  analogyStatus === "loading" && <div>Loading...</div>;
  return (
    <div
      key={analogy?.id}
      className=" relative z-20 mx-5 my-5 w-[640px] overflow-clip rounded-[17px] border border-gray-200 bg-white px-0 py-0 shadow-lg transition-all hover:border-[#c1c1c1] "
      // className="my-2 block min-w-[500px] max-w-sm rounded-s border border-gray-200 bg-white p-6 shadow transition-all hover:bg-gray-100 dark:border-gray-700  dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div
        className="border-b-1 w-full cursor-default border border-x-0 border-t-0 border-gray-200 bg-[#F9F9F9] px-5 py-4"
        onClick={(e) => {
          e.preventDefault();
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
                  src={analogyData?.user?.image || "/assets/default-pp.svg"}
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
                <div className="mb-0.5 flex items-center justify-between align-middle font-normal  text-[#666666]">
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
                  {needsLocationInfo ? (
                    <div className="mx-2 flex rounded-lg border bg-gray-100 px-3 py-1 text-xs text-gray-500">
                      <span className="  font-normal ">about&nbsp;</span>
                      <Link
                        href={`/${analogyData?.category?.slug}/${analogyData?.topic?.slug}`}
                        className="flex cursor-pointer  items-center  align-middle  font-semibold  transition-all hover:text-gray-800"
                      >
                        {analogyData?.topic?.title}
                      </Link>
                      <span className=" font-normal">&nbsp;in&nbsp;</span>
                      <Link
                        href={`/${analogyData?.category?.slug}`}
                        className="flex  cursor-pointer  items-center align-middle  font-semibold   transition-all hover:text-gray-800"
                      >
                        {analogyData?.category?.name}
                      </Link>
                    </div>
                  ) : null}
                </div>
              )}

              {votingStatus === "loading" ? (
                <SmallSkeleton />
              ) : (
                <div className="flex items-start justify-start  text-xs text-[#878787]">
                  {
                    // check if votingAverage is not NaN
                    !isNaN(votingAverage) ? (
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
                          <span></span>
                        )}
                      </>
                    ) : (
                      <>has no votes yet</>
                    )
                  }
                </div>
              )}
            </div>
          </div>

          <Voting analogyId={analogy.id} />
        </div>
      </div>

      <div className="min-h-[120px] w-full bg-white px-8 pb-7 pt-5">
        {analogyStatus === "loading" ? (
          <MultilineSkeleton />
        ) : (
          <ReactMarkdown
            className="prose-code:dark:text-gray-30 prose prose-pre:bg-[#101A25]"
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
    </div>
  );
};
interface IAnalogyViewWithLinkProps {
  children?: React.ReactNode;
}
const AnalogyViewWithLink: React.FC<IAnalogyViewWithLinkProps> = ({
  children,
}) => {
  // Extract the analogy prop from the child component
  const { analogy } = React.Children.only(children).props;
  const { data: analogyData } = api.analogy.getById.useQuery({
    id: analogy.id,
  });
  const analogyLink = `/${analogyData?.category?.slug}/${analogyData?.topic?.slug}/${analogyData?.id}`;

  const wrappedChildren = React.Children.map(children, (child) => {
    // Clone the child component and add the "needsLink" prop to it
    return React.cloneElement(child);
  });

  return analogyLink ? (
    <Link href={analogyLink}>{wrappedChildren}</Link>
  ) : (
    <>{wrappedChildren}</>
  );
};
export default AnalogyViewWithLink;
