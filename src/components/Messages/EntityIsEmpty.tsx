import { FaGhost } from "react-icons/fa";
import { GoBackButton } from "../GoBackButton";
import { type MouseEventHandler } from "react";

export interface IEntityIsEmptyProps {
  entity: string;
  action: (() => void) | MouseEventHandler<HTMLSpanElement> | undefined;
}
export function EntityIsEmpty({
  entity,
  action = () => null,
}: IEntityIsEmptyProps) {
  return (
    <div className="flex max-h-screen flex-col items-center justify-center gap-2">
      <span className="flex flex-col items-center justify-center gap-3 font-semibold text-gray-500">
        <FaGhost className=" animate-hover my-10 text-9xl text-[#DDDCD9] " />

        {entity === "profileFeed" ? (
          <span>User hasn&apos;t posted any analogies.</span>
        ) : entity === "topicFeed" ? (
          <span>There are no analogies to show.</span>
        ) : entity === "category" ? (
          <span>There are no Topics to show.</span>
        ) : (
          <span>Nothing to show.</span>
        )}
      </span>

      <span className="cursor-pointer py-2 pb-4 text-sm text-gray-500 transition-all hover:text-gray-900">
        {entity === "topicFeed" || entity === "category" ? (
          <span onClick={action}>Create one!</span>
        ) : null}
      </span>

      <GoBackButton />
    </div>
  );
}
