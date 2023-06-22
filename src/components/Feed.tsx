import { api } from "@/utils/api";
import { AnalogyView } from "../components/AnalogyView";
import { ANALOGY_STATUS } from "@prisma/client";

interface AnalogyWithUser {
  id: string;
  description: string;
  status: ANALOGY_STATUS;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  topicId: string;
  user:
    | {
        name: string;
        email: string;
        image: string;
        id: string;
      }
    | undefined;
}

interface IFeedProps {
  topicAnalogies?: AnalogyWithUser[] | undefined;
}

export const Feed = ({ topicAnalogies }: IFeedProps) => {
  // const {
  //   data,
  //   isLoading: analogiesLoading,
  //   refetch: refetchAnalogies,
  // } = api.analogy.getAll.useQuery();

  // if (analogiesLoading) return <>Loading analogies...</>;
  // if (!data) return <>Something went wrong. no data</>;
  return (
    <>
      <div id="analogies-array" className="flex flex-col items-center">
        {topicAnalogies?.map((analogy) => (
          <AnalogyView
            analogy={{
              id: analogy.id,
              description: analogy.description,
            }}
            author={{
              name: analogy.user?.name ?? "",
              email: analogy.user?.email ?? "",
              image: analogy.user?.image ?? "",
              id: analogy.user?.id ?? "",
            }}
            {...analogy}
            key={analogy.id}
          />
        ))}
      </div>
    </>
  );
};
