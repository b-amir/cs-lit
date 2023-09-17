import { Analogy } from "./Analogy";
import { EntityIsEmpty } from "./Messages/EntityIsEmpty";
import { LoadMoreButton } from "./LoadMoreButton";
import { type AnalogyInput } from "./Analogy/types";
import {
  type Analogy as AnalogyType,
  type ANALOGY_STATUS,
} from "@prisma/client";
import {
  type FetchNextPageOptions,
  type InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { setPurpose, setShown } from "../features/EditorSection/editorSlice";
import { useAppDispatch } from "@/redux/hooks";

export const AnalogiesFeed: React.FC<IFeedProps> = ({
  isProfile = false,
  analogies,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  fetchingStatus,
  setAnalogyInput,
}) => {
  const dispatch = useAppDispatch();

  //
  if (
    fetchingStatus === "success" &&
    analogies?.pages &&
    !analogies?.pages[0]?.items?.length
  ) {
    return (
      <EntityIsEmpty
        entity={isProfile ? "profileFeed" : "topicFeed"}
        action={
          isProfile
            ? undefined
            : () => {
                dispatch(setPurpose("Create"));
                dispatch(setShown(true));
              }
        }
      />
    );
  }

  return (
    <div
      id="analogies-array"
      className={`mb-auto flex flex-col items-center  pb-16 sm:px-10 lg:px-[16.666667%]`}
    >
      {analogies?.pages?.map((page) =>
        page?.items?.map((analogy: AnalogyType) => (
          <Analogy
            analogy={{
              id: analogy.id,
            }}
            key={analogy.id}
            setAnalogyInput={setAnalogyInput}
            needsLink={true}
            needsLocationInfo={isProfile ? true : false}
          />
        ))
      )}

      {hasNextPage && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
};

// --- TYPES --- //

interface IFeedProps {
  analogies:
    | {
        pages:
          | {
              items:
                | {
                    id: string;
                    title: string;
                    description: string;
                    reference: string | null;
                    status: ANALOGY_STATUS;
                    createdAt: Date;
                    updatedAt: Date;
                    authorId: string;
                    topicId: string;
                  }[]
                | undefined;
              total: number;
              pageInfo: {
                hasNextPage: boolean | undefined;
                nextCursor: string | null | undefined;
              };
            }[]
          | undefined;
        pageParams: unknown[];
      }
    | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  isFetchingNextPage: boolean;
  isProfile?: boolean;
  fetchingStatus: "error" | "loading" | "success";
  setAnalogyInput:
    | React.Dispatch<React.SetStateAction<AnalogyInput>>
    | undefined;
}
