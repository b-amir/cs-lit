import Head from "next/head";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/PageLayout";
import { useSession } from "next-auth/react";
import { MainSection } from "./MainSection";
import { HeaderSection } from "./HeaderSection";
import { EditorSection } from "@/features/EditorSection";
import { EntityNotFound } from "../../../components/Messages/EntityNotFound";

export default function TopicPage({}) {
  const router = useRouter();
  const { topic: UrlTopic } = router.query;

  const { data: topicData, status: topicFetchingStatus } =
    api.topic.getBySlug.useQuery(
      {
        slug: UrlTopic as string,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  const [analogyInput, setAnalogyInput] = useState({
    description: "",
    topicId: topicData?.id,
  });
  console.log("analogyInput:", analogyInput);

  const { data: sessionData } = useSession();

  const {
    data: topicAnalogies,
    status: analogiesFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.analogy.getByTopicId.useInfiniteQuery(
    {
      id: topicData?.id as string,
      viewerId: sessionData?.user?.id as string,
      order: "desc",
      limit: 10,
    },
    {
      enabled: !!topicData?.id,
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // --- a basic object that's passed to the form state whenever trigger is clicked --- //
  const newInput = {
    description: "",
    topicId: topicData?.id,
  };

  const analogiesCount =
    topicAnalogies?.pages && topicAnalogies?.pages[0]?.total;

  // --- pass props to components --- //
  const headerProps = {
    analogiesCount,
    analogiesFetchingStatus,
    sessionData,
    topicFetchingStatus,
    topicData,
  };

  const mainProps = {
    analogiesFetchingStatus,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setAnalogyInput,
    topicAnalogies,
    topicFetchingStatus,
  };

  const editorProps = {
    newInput,
    Input: analogyInput,
    setInput: setAnalogyInput,
    type: "Analogies",
  };

  return (
    <>
      <Head>
        <title>{`${topicData?.title ?? "CS"} Like I'm 10 !`}</title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        {topicFetchingStatus === "error" ? (
          <EntityNotFound entity="Topic" />
        ) : (
          <>
            <div
              className={`grow-1 min-h-[calc(100dvh)] w-full [overflow:overlay]`}
            >
              <HeaderSection {...headerProps} />
              <MainSection {...mainProps} />
            </div>
            <EditorSection {...editorProps} />
          </>
        )}
      </PageLayout>
    </>
  );
}
