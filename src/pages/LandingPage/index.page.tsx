import Head from "next/head";
import dynamic from "next/dynamic";
import { HeaderSection } from "@/features/LandingPage/HeaderSection";
import { HeroSection } from "@/features/LandingPage/HeroSection";

const CategoriesSection = dynamic(() =>
  import("@/features/LandingPage/CategoriesSection").then(
    (mod) => mod.CategoriesSection
  )
);
const ExampleSection = dynamic(() =>
  import("@/features/LandingPage/ExampleSection").then(
    (mod) => mod.ExampleSection
  )
);
const ShareSection = dynamic(() =>
  import("@/features/LandingPage/ShareSection").then((mod) => mod.ShareSection)
);
const FooterSection = dynamic(() =>
  import("@/features/LandingPage/FooterSection").then(
    (mod) => mod.FooterSection
  )
);

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>CS Like I&apos;m 10 !</title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderSection />
      <HeroSection />
      <CategoriesSection />
      <ExampleSection />
      <ShareSection />
      <FooterSection />
    </>
  );
}

export async function getServerSideProps() {
  await Promise.resolve();

  // Redirect to the root route '/' on the server side
  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
}
