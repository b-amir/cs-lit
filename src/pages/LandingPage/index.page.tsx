import Head from "next/head";
import { HeroSection } from "@/features/LandingPage/HeroSection";
import { ShareSection } from "@/features/LandingPage/ShareSection";
import { HeaderSection } from "@/features/LandingPage/HeaderSection";
import { FooterSection } from "@/features/LandingPage/FooterSection";
import { ExampleSection } from "@/features/LandingPage/ExampleSection";
import { CategoriesSection } from "@/features/LandingPage/CategoriesSection";

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
