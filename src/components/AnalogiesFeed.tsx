import { Analogy } from "./Analogy";
import { EntityIsEmpty } from "./Messages/EntityIsEmpty";
import { LoadMoreButton } from "./LoadMoreButton";
import { type Analogy as AnalogyType } from "@prisma/client";

interface IFeedProps {
  analogies: AnalogyType[];
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isProfile: boolean;
  fetchingStatus: "error" | "loading" | "success";
  setAnalogyInput: (arg: any) => void;
  setAnalogyEditorState: (arg: any) => void;
}

export const AnalogiesFeed: React.FC<IFeedProps> = ({
  isProfile = false,
  analogies,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  fetchingStatus,
  setAnalogyInput,
  setAnalogyEditorState,
}) => {
  if (fetchingStatus === "success" && analogies?.pages[0]?.items.length === 0) {
    return (
      <EntityIsEmpty
        entity={isProfile ? "profileFeed" : "topicFeed"}
        action={
          isProfile
            ? null
            : () => {
                setAnalogyEditorState({ shown: true, purpose: "Create" });
              }
        }
      />
    );
  }

  return (
    <>
      <div
        id="analogies-array"
        className={`mb-auto flex flex-col items-center  pb-16 sm:px-10 lg:px-[16.666667%]`}
      >
        {analogies?.pages?.map((page) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          page?.items?.map((analogy: Analogy) => (
            <Analogy
              analogy={{
                id: analogy.id,
              }}
              key={analogy.id}
              setAnalogyInput={setAnalogyInput}
              setAnalogyEditorState={setAnalogyEditorState}
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
    </>
  );
};
