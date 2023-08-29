import { useRouter } from "next/router";
import { FaArrowLeft as Arrow } from "react-icons/fa";

export function GoBackButton() {
  const router = useRouter();

  return (
    <span>
      <button
        onClick={() => {
          const previousRoute = router.back();
          if (previousRoute === undefined) {
            void router.push("/");
          }
        }}
        className="align-center justify-middle group mr-auto mt-4 inline-flex cursor-pointer flex-row items-center justify-center rounded-xl border border-transparent bg-[#9f9f9d31] px-10 py-2.5 align-middle text-xs font-normal text-[#696868] transition-all"
      >
        <Arrow className="mr-2 transition-all group-hover:-translate-x-0.5 sm:mb-0.5 " />
        go back
      </button>
    </span>
  );
}
