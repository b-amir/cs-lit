import Head from "next/head";
import { HeroSection } from "@/components/LandingPage/HeroSection";
import { ShareSection } from "@/components/LandingPage/ShareSection";
import { HeaderSection } from "@/components/LandingPage/HeaderSection";
import { FooterSection } from "@/components/LandingPage/FooterSection";
import { ExampleSection } from "@/components/LandingPage/ExampleSection";
import { CategoriesSection } from "@/components/LandingPage/CategoriesSection";

export function LandingPage() {
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
