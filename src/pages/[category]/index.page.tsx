import Head from "next/head";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/PageLayout";
import { useSession } from "next-auth/react";
import { MainSection } from "./MainSection";
import { TOPIC_STATUS } from "@prisma/client";
import { HeaderSection } from "./HeaderSection";
import { EditorSection } from "../../features/EditorSection";
import { EntityNotFound } from "@/components/Messages/EntityNotFound";
import { type TopicInput } from "./types";
import React, { useState } from "react";

export default function CategoryPage() {
  // --- get category slug from url --- //
  const {
    query: { category: UrlCategory },
  } = useRouter();

  const { data: sessionData } = useSession();

  const [topicInput, setTopicInput] = useState<TopicInput>({
    id: "",
    title: "",
    url: "",
    category: "",
    firstAnalogy: "",
    slug: "",
    status: TOPIC_STATUS.PENDING,
  });

  // --- topics sorting order state. controlled in header section --- //
  const [orderBy, setOrderBy] = useState<"desc" | "asc" | null>("desc");

  // --- get category data by slug obtained from url --- //
  const {
    data: categoryData,
    isFetching: categoryFetching,
    status: categoryFetchingStatus,
  } = api.category.getBySlug.useQuery(
    {
      slug: UrlCategory as string,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // --- a basic object that's passed to the form state whenever trigger is clicked --- //
  const newInput = {
    id: "",
    title: "",
    url: "",
    slug: "",
    category: categoryData,
    analogies: [{ id: "", description: "", reference: "" }],
    starter: { id: "" },
  };

  // --- get topics by category id --- //
  const {
    data: topicsData,
    status: topicsFetchingStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.topic.getByCategoryId.useInfiniteQuery(
    {
      id: categoryData?.id as string,
      viewerId: sessionData?.user?.id as string,
      order: orderBy,
      limit: 10,
    },
    {
      enabled: !!categoryData?.id,
      getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // --- pass props to components --- //
  const headerProps = {
    categoryFetchingStatus,
    categoryData,
    setOrderBy,
    orderBy,
    setInput: setTopicInput,
    newInput
    };
  const mainProps = {
    topicsData,
    topicsFetchingStatus,
    categoryFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setTopicInput,
  };
  const editorProps = {
    newInput,
    Input: topicInput,
    setInput: setTopicInput,
    type: "Topics",
  };

  return (
    <>
      <Head>
        <title>{`${categoryData?.name ?? "CS"} Like I'm 10 !`}</title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        {!categoryFetching && !categoryData ? (
          <EntityNotFound entity="Category" />
        ) : (
          <>
            <div className={`grow-1 min-h-[100dvh] w-full [overflow:overlay]`}>
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