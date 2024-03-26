import Link from "next/link";
import Image from "next/image";
import { test } from "vitest";
import { useSession } from "next-auth/react";
import { UserSection } from "@/components/UserSection";
import { CallToAction } from "./CallToAction";
import { HomeUserSkeleton } from "@/components/Loading/Skeleton";

export function HeaderSection() {
  const { status: sessionStatus } = useSession();

  return (
    <nav
      id="header-section"
      className="top-0 flex h-[60px] w-full items-center justify-between px-8 pt-8 sm:h-[90px] lg:px-40 lg:pt-20"
    >
      <Link href="/" className="flex items-center justify-center">
        <Image
          data-testid="logo"
          src={"/assets/logo.svg"}
          priority={true}
          width={100}
          height={0}
          alt={"CS LIT: like I'm 10"}
          className="z-10 p-0 sm:min-w-[180px]"
        />
      </Link>
      <div className="flex items-center justify-center">
        {sessionStatus === "loading" ? (
          <HomeUserSkeleton />
        ) : (
          <span className="flex items-center justify-center">
            <span className="hidden sm:flex">
              <CallToAction text="Explore Now" />
            </span>
            <div className="ml-4 flex h-[3.1rem] items-center gap-0  border-[#5c2c1d2b] bg-[#ffffff00] px-3 py-1 pr-4 backdrop-blur-sm transition-all duration-300 sm:border-l sm:py-2 ">
              <UserSection />
            </div>
          </span>
        )}
      </div>
    </nav>
  );
}
