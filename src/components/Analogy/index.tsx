import Link from "next/link";
import React from "react";
import { api } from "@/utils/api";
import { AnalogyView } from "./AnalogyView";
import { routeHandler } from "@/utils/routeHandler";
import { CornerLoading } from "../Loading/Spinner";
import { type IAnalogyProps } from "./types";
import { useEffect, useState } from "react";

export const Analogy: React.FC<IAnalogyProps> = (props) => {
  const {
    setAnalogyInput,
    analogy,
    needsLocationInfo = false,
    needsInfoRow = true,
    needsLink = false,
  } = props;

  // --- Get the data for the current analogy --- //
  const { data: analogyData, status: analogyStatus } =
    api.analogy.getById.useQuery(
      {
        id: analogy.id,
      },
      {
        enabled: !!analogy.id,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  // --- Get the votes for the current analogy --- //
  const { data: analogyVotesData, status: votingStatus } =
    api.analogy.getAnalogyVotes.useQuery(
      {
        analogyId: analogy.id,
      },
      {
        enabled: !!analogy.id,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  // --- votingAverage state is lifted to be used in two child components --- //
  const [votingAverage, setVotingAverage] = useState(0);

  // --- useEffect to run code after the first render. --- //
  useEffect(() => {
    // The `analogyVotesData` variable will be `null` until the
    // `analogyVotesQuery` has finished loading.
    if (!analogyVotesData) {
      return;
    }

    // --- voting calculations --- //
    const totalVotes = analogyVotesData.likes + analogyVotesData.dislikes;
    const voteDifference = analogyVotesData.likes - analogyVotesData.dislikes;
    const voteAverage = voteDifference / totalVotes;
    const analogyReputation = Math.round(voteAverage * 2);
    setVotingAverage(analogyReputation);
  }, [analogyVotesData]);

  const AnalogyProps: IAnalogyProps = {
    analogy,
    analogyData,
    analogyStatus,
    needsInfoRow,
    needsLocationInfo,
    setAnalogyInput,
    votingAverage,
    votingStatus,
  };

  analogyStatus === "loading" && <CornerLoading />;
  return (
    <>
      {/* in some pages there's no point in clicking on the analogy. ex: single analogy page itself */}
      {needsLink ? (
        <Link
          href={`${routeHandler(analogyData, "Analogies") ?? ""}`}
          className="mx-auto w-full max-w-[705px]"
        >
          <AnalogyView {...AnalogyProps} />
        </Link>
      ) : (
        <AnalogyView {...AnalogyProps} />
      )}
    </>
  );
};
