import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";

export function Voting({ analogyId }: { analogyId: string }) {
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

  // console.log("whatDidCurrentUserVote", whatDidCurrentUserVote);

  const { mutate: Vote, isLoading: isVoting } = api.analogy.voting.useMutation({
    onSuccess: () => {
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
      // console.log(errorMessage);
      if (errorMessage) {
        if (errorMessage.vote) {
          toast.error(errorMessage?.vote.join(" "));
        }
      } else {
        toast.error("Login to vote!");
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
    <div className="flex flex-col">
      <SlArrowUp
        className={`${
          vote === "like" ? "text-green-400" : "text-gray-400"
        } cursor-pointer ${isVoting ? "animate-pulse" : ""}}`}
        onClick={handleLike}
      />

      <SlArrowDown
        className={`${
          vote === "dislike" ? "text-red-400" : "text-gray-400"
        } cursor-pointer  ${isVoting ? "animate-pulse" : ""}}`}
        onClick={handleDislike}
      />
    </div>
  );
}
