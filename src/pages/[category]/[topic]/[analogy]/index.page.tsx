import Head from "next/head";
import dynamic from "next/dynamic";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/PageLayout";
import { MainSection } from "@/features/AnalogyPage/MainSection";
import { EntityNotFound } from "@/components/Messages/EntityNotFound";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { setAnalogyInput } from "@/features/EditorSection/inputSlice";

export default function SingleAnalogyPage() {
  const router = useRouter();
  const input = useAppSelector((state) => state.input.analogyInput);

  console.log("analogy input:", input);

  const { analogy: UrlAnalogyId } = router.query;

  const { data: singleAnalogyData, status: singleAnalogyFetchingStatus } =
    api.analogy.getSingleAnalogyById.useQuery(
      { id: UrlAnalogyId as string },
      {
        enabled: !!UrlAnalogyId,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(setAnalogyInput(singleAnalogyData));
  }, [dispatch, singleAnalogyData]);

  const CommentSection = dynamic(() =>
    import("@/features/AnalogyPage/CommentSection").then(
      (mod) => mod.CommentSection
    )
  );

  const AboutWebsiteSection = dynamic(() =>
    import("@/features/AnalogyPage/AboutWebsiteSection").then(
      (mod) => mod.AboutWebsiteSection
    )
  );

  const SharingSection = dynamic(() =>
    import("@/features/AnalogyPage/SharingSection").then(
      (mod) => mod.SharingSection
    )
  );

  const EditorSection = dynamic(() =>
    import("@/features/EditorSection").then((mod) => mod.EditorSection)
  );

  const InfoSection = dynamic(() =>
    import("@/features/AnalogyPage/InfoSection").then((mod) => mod.InfoSection)
  );

  return (
    <>
      <Head>
        <title>
          {`${singleAnalogyData?.topic?.title ?? "Analogy"} by ${
            singleAnalogyData?.user?.name ?? "User"
          }`}
        </title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        {singleAnalogyFetchingStatus === "error" ? (
          <EntityNotFound entity="Analogy" />
        ) : (
          <>
            <div className="mx-auto flex max-w-[900px] flex-col justify-between pt-28 sm:px-10 sm:pt-40 lg:px-14">
              <SharingSection />
              <MainSection singleAnalogyData={singleAnalogyData} />
              <InfoSection singleAnalogyData={singleAnalogyData} />
              <CommentSection analogyId={singleAnalogyData?.id} />
            </div>
            <AboutWebsiteSection />

            <EditorSection
              type="Analogies"
              // @ts-ignore
              newInput={input}
            />
          </>
        )}
      </PageLayout>
    </>
  );
}
