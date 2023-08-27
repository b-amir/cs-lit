import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";

export function Voting({ analogyId }: { analogyId: string }) {
  const { data: whatDidCurrentUserVote } =
    api.analogy.whatDidCurrentUserVote.useQuery(
      {
        analogyId: analogyId,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const ctx = api.useContext();

  const [vote, setVote] = useState<string | null>(
    whatDidCurrentUserVote ?? null
  );

  useEffect(() => {
    if (whatDidCurrentUserVote) {
      setVote(whatDidCurrentUserVote);
    }
  }, [whatDidCurrentUserVote]);

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

  const handleLike = () => {
    if (vote === "like") {
      setVote(null);
      Vote({
        analogyId: analogyId,
        vote: "retract",
      });
    } else {
      setVote("like");
      Vote(
        // add 1 to likes count
        {
          analogyId: analogyId,
          vote: "like",
        }
      );
    }
  };

  const handleDislike = () => {
    if (vote === "dislike") {
      setVote(null);

      Vote({
        analogyId: analogyId,
        vote: "retract",
      });
    } else {
      setVote("dislike");
      Vote({
        analogyId: analogyId,
        vote: "dislike",
      });
    }
  };

  return (
    <div className="flex flex-col" id="voting">
      <IoIosArrowUp
        className={`mb-0.5 ${
          vote === "like"
            ? "text-green-400 hover:text-green-600"
            : "text-gray-400 hover:text-gray-600"
        } cursor-pointer ${
          isVoting ? "animate-pulse" : ""
        }} scale-[1.3] scale-x-[1.4]`}
        onClick={handleLike}
      />

      <IoIosArrowUp
        className={`${
          vote === "dislike"
            ? "text-red-400 hover:text-red-600"
            : "text-gray-400 hover:text-gray-600"
        } cursor-pointer  ${
          isVoting ? "animate-pulse" : ""
        }} rotate-180 scale-[1.3] scale-x-[1.4]`}
        onClick={handleDislike}
      />
    </div>
  );
}
