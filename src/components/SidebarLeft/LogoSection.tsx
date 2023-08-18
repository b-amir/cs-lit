import Image from "next/image";
import Link from "next/link";

export function LogoSection() {
  return (
    <div className=" border-b-1 mb-0 flex h-[calc(90px+1.5px)] items-center justify-center gap-6 border border-x-0 border-t-0 bg-[#f8f8f8] py-5 pl-7 pr-9 shadow-sm">
      <Link href="/">
        <Image
          src={"/assets/logo17.svg"}
          width={80}
          height={20}
          alt={"CS LIT: like I'm 10"}
          className=" min-w-[100px] sm:min-w-[120px] "
        />
      </Link>
    </div>
  );
}
