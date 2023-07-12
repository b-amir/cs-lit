import Link from "next/link";
import Image from "next/image";
import { Voting } from "./Voting";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface IAnalogyViewProps {
  analogy: {
    id: string;
    description: string;
  };
  author: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}
export const AnalogyView = (props: IAnalogyViewProps) => {
  const { analogy, author } = props;

  const router = useRouter();

  // using getAnalogyVotes trpc endpoint, get data for analogy votes
  const { data: analogyVotesData } = api.analogy.getAnalogyVotes.useQuery({
    analogyId: analogy.id,
  });

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

  // console.log("votingAverage", votingAverage);
  // console.log("analogyVotesData", analogyVotesData);

  const {
    category: UrlCategory,
    topic: UrlTopic,
    // analogy: UrlAnalogyId,
  } = router.query;

  return (
    <Link href={`/${UrlCategory}/${UrlTopic}/${analogy?.id}`}>
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
              <Link
                href={`/profile/${author?.id}`}
                className="flex items-center align-middle text-xs "
              >
                <Image
                  src={author?.image || "/assets/default-pp.svg"}
                  className="ml-1 mr-4 h-8 w-8 rounded-full ring-[3px] ring-[#b2b2b232] transition-all duration-300 hover:ring-[#80808073]"
                  alt={"Profile Picture"}
                  width={42}
                  height={42}
                />
              </Link>
              <div>
                <span className="mb-0.5 flex items-center justify-between align-middle font-normal  text-[#666666]">
                  <Link
                    href={`/profile/${author?.id}`}
                    className="flex items-center align-middle text-sm transition-all hover:text-gray-800"
                  >
                    {
                      author?.name ? author?.name : author?.email
                      // ? author?.email
                      // : "Anonymous"
                    }
                  </Link>
                  <span className="text-sm font-normal">&apos;s analogy</span>
                </span>

                <div className="flex items-start justify-start  text-xs text-[#878787]">
                  {
                    // check if votingAverage is not NaN
                    !isNaN(votingAverage) ? (
                      <>
                        {votingAverage === -2 ? (
                          <span className="text-[#b95353]">
                            Needs improving
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
              </div>
            </div>

            <Voting analogyId={analogy.id} />
          </div>
        </div>
        <div className="h-min-400 p-x8 w-full bg-white px-5 py-4">
          <ReactMarkdown
            className="prose-code:dark:text-gray-30 prose prose-pre:bg-[#101A25]"
            // eslint-disable-next-line react/no-children-prop
            children={analogy?.description}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, "")}
                    style={coldarkDark}
                    // wrapLines={true}
                    wrapLongLines={true}
                    language={match[1]}
                    // showLineNumbers={true}
                    // showInlineLineNumbers={true}
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
    </Link>
  );
};
