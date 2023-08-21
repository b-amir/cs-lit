import { MdOutlineWrongLocation } from "react-icons/md";
import { GoBackButton } from "./GoBackButton";

export function EntityNotFound({ entity }: { entity: string }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <span className="flex flex-col items-center justify-center gap-3 font-semibold text-gray-700">
        <MdOutlineWrongLocation className="scale-150" /> {entity} not found.
      </span>
      <span className="text-sm text-gray-500">Check the spelling in URL.</span>
      <GoBackButton />
    </div>
  );
}
