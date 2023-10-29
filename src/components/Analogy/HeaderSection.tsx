import Link from "next/link";
import React from "react";
import Image from "next/image";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { type USER } from "../UserSection";
import { routeHandler } from "@/utils/routeHandler";
import { getScreenName } from "@/utils/getScreenName";
import { useEffect, useState } from "react";
import { type IHeaderSectionProps } from "./types";
import { IoIosArrowUp as VotingArrow } from "react-icons/io";
import {
  AvatarSkeleton,
  MediumSkeleton,
  SmallSkeleton,
} from "../Loading/Skeleton";

export function HeaderSection({
  analogy,
  analogyData,
  analogyStatus,
  votingAverage,
  votingStatus,
}: IHeaderSectionProps) {
  return (
    <div
      className="border-b-1 w-full cursor-default border border-x-0 border-t-0 border-gray-200 bg-gray-1 px-5 py-4 shadow-[inset_0px_-3px_1px_0px_#00000003]"
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
              href={`${routeHandler(analogyData?.user, "Users") ?? ""}`}
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
                  href={`${routeHandler(analogyData?.user, "Users") ?? ""}`}
                  className="flex items-center align-middle text-sm transition-all hover:text-gray-800"
                >
                  {getScreenName((analogyData?.user as USER) ?? "")}
                </Link>
                <span className="text-sm font-normal">&apos;s analogy</span>
              </div>
            )}

            {votingStatus === "loading" ? (
              <SmallSkeleton />
            ) : (
              <VotingAverageSection votingAverage={votingAverage} />
            )}
          </div>
        </div>

        <VoteCastingSection analogyId={analogy?.id} />
      </div>
    </div>
  );
}
export function VotingAverageSection({
  votingAverage,
}: {
  votingAverage: number;
}) {
  return (
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
              <span className="text-[#b95353]">Needs improvement</span>
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
  );
}
export function VoteCastingSection({ analogyId }: { analogyId: string }) {
  const { data: whatDidCurrentUserVote } =
    api.analogy.whatDidCurrentUserVote.useQuery({
      analogyId: analogyId,
    });
  const [vote, setVote] = useState<string | null>(
    whatDidCurrentUserVote ?? null
  );

  useEffect(() => {
    if (whatDidCurrentUserVote) {
      setVote(whatDidCurrentUserVote);
    }
  }, [whatDidCurrentUserVote]);
  const ctx = api.useContext();

  // --- actually casting the vote to database --- //
  const { mutate: Vote, isLoading: isVoting } = api.analogy.voting.useMutation({
    onSuccess: () => {
      void ctx.analogy.getAnalogyVotes.invalidate();

      toast.success(
        vote === "like"
          ? "You liked this analogy!"
          : vote === "dislike"
          ? "You disliked this analogy!"
          : "You removed your vote!"
      );
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors;
      if (errorMessage) {
        if (errorMessage.vote) {
          toast.error(errorMessage?.vote.join(" "));
        }
      } else if (e.message.includes("UNAUTHORIZED")) {
        toast.error("Sign in to vote.");
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleVote = (newVote: string) => {
    const voteAction = vote === newVote ? "retract" : newVote; // repeating the vote: retraction
    setVote(vote === newVote ? null : newVote);
    Vote({
      analogyId: analogyId,
      vote: voteAction,
    });
  };

  const handleLike = () => handleVote("like");
  const handleDislike = () => handleVote("dislike");

  return (
    <div className="flex flex-col" id="voting">
      <VotingArrow
        className={`mb-0.5 ${
          vote === "like"
            ? "text-green-400 hover:text-green-600"
            : "text-gray-400 hover:text-gray-600"
        } cursor-pointer ${
          isVoting ? "animate-pulse" : ""
        }} scale-[1.3] scale-x-[1.4]`}
        onClick={handleLike}
        data-testid="like-button"
      />

      <VotingArrow
        className={`${
          vote === "dislike"
            ? "text-red-400 hover:text-red-600"
            : "text-gray-400 hover:text-gray-600"
        } cursor-pointer  ${
          isVoting ? "animate-pulse" : ""
        }} rotate-180 scale-[1.3] scale-x-[1.4]`}
        onClick={handleDislike}
        data-testid="dislike-button"
      />
    </div>
  );
}
