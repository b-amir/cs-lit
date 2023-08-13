import Head from "next/head";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/layout";
import { AnalogyInfoRow, AnalogyView } from "@/components/AnalogyView";
import { CornerLoading, LoadingSpinner } from "@/components/loading";
import { FaArrowLeft } from "react-icons/fa";
import { RiImageLine } from "react-icons/ri";
import { AiFillLock, AiOutlineLink } from "react-icons/ai";
import { LuExternalLink } from "react-icons/lu";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { archivo } from "@/styles/customFonts";
import Image from "next/image";
import { type Comment } from "@prisma/client";
import { RelativeTime } from "../../../../utils/relativeTime";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { AnalogySkeleton, CommentSkeleton } from "@/components/Skeleton";
import { useCreateItem } from "@/hooks/useCreateItem";
import { LoadMoreButton } from "@/components/LoadMoreButton";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function SingleAnalogyPage() {
  const router = useRouter();

  const {
    category: UrlCategory,
    topic: UrlTopic,
    analogy: UrlAnalogyId,
  } = router.query;

  // api.analogy.getAll.useQuery();

  const { data: singleAnalogyData, status } =
    api.analogy.getSingleAnalogyById.useQuery({
      id: UrlAnalogyId as string,
    });

  const { data: categoryData } = api.category.getBySlug.useQuery({
    slug: UrlCategory as string,
  });

  const { data: topicsData } = api.topic.getBySlug.useQuery({
    slug: UrlTopic as string,
  });

  if (status === "loading") {
    return <CornerLoading />;
  }

  return (
    <>
      <Head>
        <title>
          {`${topicsData?.title ?? ""} by ${
            singleAnalogyData?.author?.name ?? ""
          }`}{" "}
          - CSLIT
        </title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div className="mx-auto flex  max-w-[720px] flex-col justify-between pt-40">
          <NavShare router={router} />
          <MainSection
            categoryData={categoryData}
            topicsData={topicsData}
            singleAnalogyData={singleAnalogyData}
          />
          <InfoSection singleAnalogyData={singleAnalogyData} />
          <CommentSection analogyId={singleAnalogyData?.id} />
        </div>
        <AboutWebsite />
      </PageLayout>
    </>
  );
}
function NavShare({ router }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000); // Reset copied state to false after 3 seconds
  };

  return (
    <div
      id="nav-share"
      className="mb-8 flex w-full flex-row justify-between text-[#2A2A2E]"
    >
      <button
        onClick={() => router.back()}
        className="align-center justify-middle group mr-auto inline-flex cursor-pointer flex-row items-center justify-center rounded-[12px] border border-transparent px-0 py-1 align-middle transition-all"
      >
        <FaArrowLeft className="mr-2  transition-all group-hover:-translate-x-0.5 " />
        back
      </button>
      <div className="flex flex-row items-center">
        {/* <FiShare />  */}
        Share As:{" "}
        <button className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-4 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]">
          <RiImageLine className="mr-1" />
          Image{" "}
        </button>{" "}
        or{" "}
        <button
          onClick={handleCopy}
          className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-4 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]"
        >
          {!copied ? <AiOutlineLink className="mr-1" /> : null}
          {copied ? "Copied" : "Link"}
        </button>
      </div>
    </div>
  );
}
interface IMainSectionProps {
  categoryData?: {
    name: string;
  };
  topicsData?: {
    title: string;
  };
  singleAnalogyData: {
    id: string;
  };
}
function MainSection({
  categoryData,
  topicsData,
  singleAnalogyData,
}: IMainSectionProps) {
  const domainName =
    // avoid the ReferenceError and get the domain name of the current URL in the browser environment
    typeof window !== "undefined"
      ? window.location.origin.replace(/^https?:\/\//, "")
      : "";

  return (
    <div
      id="single-analogy"
      className="mb-auto rounded-[23px] bg-[#e8e5e2] bg-gradient-to-bl from-[#1e7cba] to-[#7c1db3] px-5 py-5"
    >
      <div className="flex flex-row justify-between px-7 pb-1 pt-8 ">
        <span className="flex flex-row text-sm font-semibold text-[#efefefc7]">
          <span className="max-w-[8rem] truncate">{categoryData?.name}</span>
          <span className="mx-2"> {topicsData && "/"}</span>
          <span className="max-w-[16rem] truncate">{topicsData?.title}</span>
        </span>{" "}
        <span className="text-sm text-[#efefefa7]">{domainName}</span>
      </div>

      <AnalogyView
        analogy={{
          id: singleAnalogyData.id,
        }}
        // because in single analogy page the info row is rendered outside of analogy view for a cleaner look
        needsInfoRow={false}
      />
    </div>
  );
}
function InfoSection({ singleAnalogyData }) {
  return (
    <div className="mb-auto mt-8 rounded-[23px] bg-[#d7d7d7]  px-6 py-2">
      <AnalogyInfoRow
        needsLocationInfo={false}
        analogyData={singleAnalogyData}
      />
    </div>
  );
}
function CommentSection({ analogyId }) {
  const [commentInput, setCommentInput] = useState({
    content: "",
    analogyId: analogyId as string,
  });

  const { data: sessionData, status: sessionStatus } = useSession();

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
    { getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor }
  );

  const ctx = api.useContext();

  const item = commentInput as Comment;
  const type = "Comments";

  const createItem = useCreateItem(item, type);
  const handleCreate = (e) => {
    e.preventDefault();
    setCommentInput({ ...commentInput, content: "" });
    createItem();
  };

  return (
    <div
      id="comments-section"
      className="mb-auto mt-8 rounded-[23px] bg-[#d7d7d7] px-6 py-2"
    >
      <h2 className="text-md p-3 font-bold text-[#2A2A2E]">Comments</h2>
      {commentsFetchingStatus === "loading" ? (
        <CommentSkeleton />
      ) : (
        <div id="comments">
          {comments?.pages[0]?.total > 0 ? (
            comments?.pages?.map((page) =>
              page?.items?.map((comment: Comment) => (
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
                        {comment.user.name
                          ? comment.user.name
                          : comment.user.email}
                      </div>
                    </Link>
                    <div
                      id="time"
                      className="mt-0.5 text-xs font-normal text-slate-400"
                    >
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
            <div id="comment-editor">
              <form
                action=""
                className="my-4 flex flex-col hover:border-gray-400 focus:shadow-sm"
              >
                <textarea
                  id="comment-input"
                  className={`w-full cursor-pointer resize-none  ${
                    commentInput.content.trim() === ""
                      ? "rounded-md"
                      : "rounded-t-md"
                  } border border-[#ffffff45]  bg-[#ffffff45] 
            px-3 py-2 text-sm placeholder-gray-500 transition-all duration-200 
          hover:bg-[#ffffff6c] focus:cursor-text focus:bg-white 
            focus:outline-none`}
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
                    className="w-full rounded-b-md border-t border-[#55545432] border-gray-300  
              bg-gray-100 py-2 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-200 "
                    onClick={handleCreate}
                  >
                    send
                  </button>
                )}
              </form>
            </div>
          ) : (
            <div
              className={`my-4 flex w-full cursor-pointer resize-none items-center rounded-lg  border 
      border-[#ffffff45] bg-[#ffffff45] px-3 py-2 text-sm text-gray-500 transition-all
    duration-200 hover:bg-[#ffffff6c] hover:text-gray-600`}
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
function AboutWebsite() {
  const [aboutIsHidden, setAboutIsHidden] = useState(true);

  return (
    <>
      <div
        className="group mt-14 flex cursor-pointer flex-col items-center py-8 text-[#a7a7a7]"
        onClick={() => {
          setAboutIsHidden(!aboutIsHidden);
          setTimeout(() => {
            window.scrollTo({
              top: document.getElementById("what-is-footer")?.offsetTop,
              behavior: "smooth",
            });
          }, 10);
        }}
      >
        <span className="mb-1 text-xs transition-all hover:text-[#2A2A2E]">
          About this website
        </span>{" "}
      </div>
      {!aboutIsHidden && (
        <div
          id="what-is-footer"
          className="border-t-1 mt-auto w-full  border border-x-0 border-b-0 bg-[#2a2a2e3b]  px-20 pb-14 pt-12 text-[#656565]"
        >
          <span className={`${archivo.className}  font-extrabold`}>
            What is CS LIT?
          </span>
          <br />
          <br />
          <span className="text-sm ">
            CS LIT is an abbreviation for Computer Science Like I&apos;m Ten. It
            simplifies computer science education for all ages through a
            collaborative learning environment. Explore complex concepts with
            ease and gain valuable experience in this field.
          </span>
          <br />
          <br />
          <Link href="/">
            <span className="inline-flex cursor-pointer flex-row text-sm font-semibold hover:underline ">
              <LuExternalLink className="mr-1 mt-0.5" /> See more analogies like
              this
            </span>
          </Link>
        </div>
      )}
    </>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = generateSSGHelper();

//   const id = context.params?.id as string;
//   if (typeof id !== "string") throw new Error("slug is not a string");

//   const username = id.replace("@", "");
//   await ssg.analogy.getById.prefetch({ id });

//   return {
//     props: {
//       trpcState: JSON.parse(JSON.stringify(ssg.dehydrate())),
//       id,
//     },
//   };
// };

// export const getStaticPaths = () => {
//   return { paths: [], fallback: "blocking" };
// };

// export default SingleAnalogyPage;
