import { AnalogyView } from "../components/AnalogyView";
import { type Analogy } from "@prisma/client";
import { LoadMoreButton } from "./LoadMoreButton";

interface IFeedProps {
  topicAnalogies: Analogy[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export const Feed: React.FC<IFeedProps> = ({
  topicAnalogies,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  setAnalogyInput,
  setAnalogyEditorState,
}) => {
  // const {
  //   data,
  //   isLoading: analogiesLoading,
  //   refetch: refetchAnalogies,
  // } = api.analogy.getAll.useQuery();

  // if (analogiesLoading) return <>Loading analogies...</>;
  // if (!data) return <>Something went wrong. no data</>;
  return (
    <>
      <div
        id="analogies-array"
        className="flex flex-col items-center sm:px-10 lg:px-16"
      >
        {topicAnalogies?.pages?.map((page) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          page?.items?.map((analogy: Analogy) => (
            <AnalogyView
              analogy={{
                id: analogy.id,
              }}
              key={analogy.id}
              needsLink={true}
              setAnalogyInput={setAnalogyInput}
              setAnalogyEditorState={setAnalogyEditorState}
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
