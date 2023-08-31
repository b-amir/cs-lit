import Head from "next/head";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/PageLayout";
import { useSession } from "next-auth/react";
import { EntityNotFound } from "../../../components/Messages/EntityNotFound";
import { useRef, useState } from "react";
import { useSpring } from "@react-spring/web";
import { HeaderSection } from "./HeaderSection";
import { EditorSection } from "./EditorSection";
import { MainSection } from "./MainSection";

export default function TopicPage({}) {
  const router = useRouter();
  const { topic: UrlTopic } = router.query;

  const [analogyEditorState, setAnalogyEditorState] = useState({
    entity: "analogy" as null | "analogy" | "topic",
    shown: false,
    purpose: null as null | "Edit" | "Create",
  });

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
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // --- animation setup for editor --- //
  const contentRef = useRef<HTMLDivElement>(null);
  const animationProps = useSpring({
    height: !analogyEditorState.shown ? 0 : sessionData ? 620 : 150,
    config: {
      tension: 200,
      friction: 30,
    },
  });

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
    setAnalogyEditorState,
    setAnalogyInput,
    topicAnalogies,
    topicFetchingStatus,
  };

  const editorProps = {
    analogyEditorState,
    analogyInput,
    animationProps,
    contentRef,
    newInput,
    setAnalogyEditorState,
    setAnalogyInput,
    topicData,
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
