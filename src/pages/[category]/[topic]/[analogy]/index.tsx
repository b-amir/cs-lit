import Head from "next/head";
import { api } from "@/utils/api";
import { SharingSection } from "./SharingSection";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/PageLayout";
import { MainSection } from "./MainSection";
import { InfoSection } from "./InfoSection";
import { CommentSection } from "./CommentSection";
import { EntityNotFound } from "@/components/Messages/EntityNotFound";
import { AboutWebsiteSection } from "./AboutWebsiteSection";

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
          </>
        )}
      </PageLayout>
    </>
  );
}
