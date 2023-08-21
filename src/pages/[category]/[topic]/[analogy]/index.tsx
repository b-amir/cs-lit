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
import { useSession } from "next-auth/react";

export default function SingleAnalogyPage() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { analogy: UrlAnalogyId } = router.query;
  const { data: singleAnalogyData, status: singleAnalogyFetchingStatus } =
    api.analogy.getSingleAnalogyById.useQuery(
      {
        id: UrlAnalogyId as string,
      },
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      }
    );

  /*
  - prevent irrelevant users to see unpublished analogies 
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */

  const authorId = singleAnalogyData?.user?.id;
  const isAuthor = authorId === sessionData?.user?.id;
  const isModerator = ["ADMIN", "EDITOR"].includes(sessionData?.user?.role);
  const isPublished = singleAnalogyData?.status === "PUBLISHED";

  // if analogy status is anything but PUBLISHED, only author, ADMIN & EDITOR can see it.
  const unauthorizedAccess = !isPublished && !isAuthor && !isModerator;

  /* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

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
        {/* if analogy is not found - invalid route */}
        {singleAnalogyFetchingStatus === "error" ? (
          // || unauthorizedAccess
          <EntityNotFound entity="Analogy" />
        ) : (
          <>
            <div className="mx-auto flex  max-w-[900px] flex-col justify-between pt-28 sm:px-10 sm:pt-40 lg:px-14">
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
