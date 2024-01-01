import Link from "next/link";

export function CallToAction({ text = "Start Contributing!" }) {
  return (
    <Link
      href={"/home"}
      className="font-regular text-md text-md group mx-auto mb-1 flex h-12 flex-row content-center items-center justify-center rounded-xl border border-[#5c2c1d2b] bg-[#ff7263] px-8 py-3 font-semibold text-[#ffffffd3] shadow-sm transition-all duration-200 hover:border-[#5c2c1d66] hover:px-8 hover:shadow-md"
    >
      <span className="cursor-pointer transition-all duration-300 [text-shadow:_0_1px_6px_rgb(0_0_0_/_20%)] group-hover:-translate-x-0.5">
        {text}
      </span>
    </Link>
  );
}
