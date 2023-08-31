import Link from "next/link";
import { archivo } from "@/styles/customFonts";
import { type IHeaderSectionProps } from "../types";
import { LuExternalLink as LinkIcon } from "react-icons/lu";

export function HeaderSection({
  analogiesCount,
  analogiesFetchingStatus,
  sessionData,
  topicFetchingStatus,
  topicData,
}: IHeaderSectionProps) {
  return (
    <div className="mb-14 flex w-full  flex-col border-b border-gray-300 bg-gradient-to-tr from-[#ff73631a] via-transparent to-transparent px-6 pb-6 pl-8 pt-28 sm:px-12 sm:pt-32 lg:px-[18%]">
      {/* topic title */}
      {topicFetchingStatus === "loading" ? (
        <div className=" mb-4  h-8 w-1/4 animate-pulse rounded-lg bg-[#b4b4b49f]" /> // skeleton
      ) : (
        <h1
          className={`${archivo.className} max-w-[720px] truncate whitespace-pre-wrap break-words text-2xl font-extrabold tracking-tight text-[#2A2A2E]  sm:text-4xl lg:text-5xl`}
        >
          {topicData?.title}
        </h1>
      )}
      <br />

      {/* analogies count */}
      <div className="flex w-full flex-row items-center justify-between py-1 text-sm text-[#808080] ">
        {analogiesFetchingStatus === "loading" ? (
          <div className="grow-1 flex h-5 w-24 animate-pulse rounded-md bg-[#b4b4b49f]" /> // skeleton
        ) : (
          <p className="grow-1 inline-flex">
            {analogiesCount ? analogiesCount : "No"}
            &nbsp;
            {
              sessionData?.user.role === "ADMIN" ? "published " : "" // admin can see unpublished analogies too. hence adding "published" so it's not confusing.
            }
            {analogiesCount === 1 ? "analogy" : "analogies"}
            <span className="hidden sm:flex">&nbsp;for this topic.&nbsp; </span>
          </p>
        )}

        {/* link to docs */}
        <Link href={`${topicData?.url ?? ""}`} target="_blank">
          <button className=" align-center justify-middle ml-auto flex grow-0 cursor-pointer items-center rounded-[17px] border border-transparent px-3 py-1 transition-all hover:border-[#d2d2d2] hover:bg-[#f0f0f0] hover:text-[#555555]">
            <LinkIcon className="mb-0.5" /> &nbsp;Official docs
          </button>
        </Link>
      </div>
    </div>
  );
}
