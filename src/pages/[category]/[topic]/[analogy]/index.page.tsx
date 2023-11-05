import Head from "next/head";
import { api } from "@/utils/api";
import { SharingSection } from "../../../../features/AnalogyPage/SharingSection";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/PageLayout";
import { MainSection } from "../../../../features/AnalogyPage/MainSection";
import { InfoSection } from "../../../../features/AnalogyPage/InfoSection";
import { CommentSection } from "../../../../features/AnalogyPage/CommentSection";
import { EntityNotFound } from "@/components/Messages/EntityNotFound";
import { AboutWebsiteSection } from "../../../../features/AnalogyPage/AboutWebsiteSection";
import { useEffect, useState } from "react";
import { EditorSection } from "@/features/EditorSection";
import { useAppDispatch } from "@/redux/hooks";

export default function SingleAnalogyPage() {
  const router = useRouter();
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

  const [analogyInput, setAnalogyInput] = useState(singleAnalogyData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setAnalogyInput(singleAnalogyData);
  }, [dispatch, singleAnalogyData]);

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
              <MainSection
                singleAnalogyData={singleAnalogyData}
                setAnalogyInput={setAnalogyInput}
              />
              <InfoSection singleAnalogyData={singleAnalogyData} />
              <CommentSection analogyId={singleAnalogyData?.id} />
            </div>
            <AboutWebsiteSection />
            <EditorSection
              Input={analogyInput}
              setInput={setAnalogyInput}
              type="Analogies"
              newInput={analogyInput}
            />
          </>
        )}
      </PageLayout>
    </>
  );
}
