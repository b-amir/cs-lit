import Head from "next/head";
import dynamic from "next/dynamic";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/PageLayout";
import { useSession } from "next-auth/react";
import { MainSection } from "@/features/CategoryPage/MainSection";
import { TOPIC_STATUS } from "@prisma/client";
import { HeaderSection } from "@/features/CategoryPage/HeaderSection";
import { EntityNotFound } from "@/components/Messages/EntityNotFound";
import { type TopicInput } from "@/features/CategoryPage/types";
import React, { useState } from "react";

export default function CategoryPage() {
  // --- get category slug from url --- //
  const {
    query: { category: UrlCategory },
  } = useRouter();

  const { data: sessionData } = useSession();

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
    newInput,
  };
  const mainProps = {
    topicsData,
    topicsFetchingStatus,
    categoryFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
  const editorProps = {
    newInput,
    type: "Topics",
  };

  const EditorSection = dynamic(() =>
    import("@/features/EditorSection").then((mod) => mod.EditorSection)
  );

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
