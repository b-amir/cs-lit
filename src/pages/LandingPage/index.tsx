import Head from "next/head";
import { HeroSection } from "@/pages/LandingPage/HeroSection";
import { ShareSection } from "@/pages/LandingPage/ShareSection";
import { HeaderSection } from "@/pages/LandingPage/HeaderSection";
import { FooterSection } from "@/pages/LandingPage/FooterSection";
import { ExampleSection } from "@/pages/LandingPage/ExampleSection";
import { CategoriesSection } from "@/pages/LandingPage/CategoriesSection";

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
