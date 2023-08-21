import { AnalogyView } from "../components/AnalogyView";
import { type Analogy } from "@prisma/client";
import { LoadMoreButton } from "./LoadMoreButton";

interface IFeedProps {
  analogies: Analogy[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isProfile: boolean;
}

export const Feed: React.FC<IFeedProps> = ({
  isProfile = false,
  analogies,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  setAnalogyInput,
  setAnalogyEditorState,
}) => {
  // if (analogiesLoading) return <>Loading analogies...</>;
  // if (!data) return <>Something went wrong. no data</>;
  return (
    <>
      <div
        id="analogies-array"
        className={`mb-auto flex flex-col items-center  pb-16 sm:px-10 lg:px-[16.666667%]`}
      >
        {analogies?.pages?.map((page) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          page?.items?.map((analogy: Analogy) => (
            <AnalogyView
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
