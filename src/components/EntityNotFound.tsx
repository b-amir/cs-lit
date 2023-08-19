import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineWrongLocation } from "react-icons/md";
import { useRouter } from "next/router";

export function EntityNotFound({ entity }: { entity: string }) {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <span className="flex flex-col items-center justify-center gap-3 font-semibold text-gray-700">
        <MdOutlineWrongLocation className="scale-150" /> {entity} not found.
      </span>
      <span className="text-sm text-gray-500">Check the spelling in URL.</span>
      <span className="text-sm text-gray-500">
        <button
          onClick={() => router.back()}
          className="align-center justify-middle group mr-auto  mt-4 inline-flex cursor-pointer flex-row items-center justify-center rounded-md border border-transparent bg-[#dbdad8] px-4 py-1.5 align-middle text-xs font-normal text-[#9c9b9a] transition-all"
        >
          <FaArrowLeft className="mr-2 transition-all group-hover:-translate-x-0.5 sm:mb-0.5 " />
          go back
        </button>
      </span>
    </div>
  );
}
