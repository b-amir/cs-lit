import Link from "next/link";
import Image from "next/image";
import { UserSection } from "@/components/UserSection";
import { HomeUserSkeleton } from "@/components/Loading/Skeleton";
import { useSession } from "next-auth/react";
import { test } from "vitest";

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
          <div className="flex items-center gap-0 rounded-full border border-[#5c2c1d2b] bg-[#ffffff36] px-2 py-1 pr-4 backdrop-blur-sm transition-all duration-300 hover:border-[#5c2c1d91] hover:bg-[#ff73631c] sm:py-2 ">
            <UserSection />
          </div>
        )}
      </div>
    </nav>
  );
}
