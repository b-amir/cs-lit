import Head from "next/head";
import { api } from "@/utils/api";
import { PageLayout } from "@/components/layout";
import { useRouter } from "next/router";
import { EntityNotFound } from "@/components/EntityNotFound";
import { CommentSection } from "./CommentSection";
import { AboutWebsiteSection } from "./AboutWebsiteSection";
import { InfoSection } from "./InfoSection";
import { MainSection } from "./MainSection";
import { NavShare } from "./NavShare";

export default function SingleAnalogyPage() {
  const router = useRouter();
  const { analogy: UrlAnalogyId } = router.query;
  const { data: singleAnalogyData, status: singleAnalogyStatus } =
    api.analogy.getSingleAnalogyById.useQuery({
      id: UrlAnalogyId as string,
    });

  return (
    <>
      <Head>
        <title>
          {`${singleAnalogyData?.topic?.title ?? ""} by ${
            singleAnalogyData?.user?.name ?? ""
          }`}{" "}
          - CSLIT
        </title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {/* if analogy is not found - invalid route */}
        {singleAnalogyStatus === "error" ? (
          <EntityNotFound entity="Analogy" />
        ) : (
          <>
            <div className="mx-auto flex  max-w-[720px] flex-col justify-between pt-40">
              <NavShare router={router} />
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
