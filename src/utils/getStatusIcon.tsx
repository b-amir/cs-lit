import { IoMdCheckmark } from "react-icons/io";
import { IoCloseSharp, IoTimeOutline } from "react-icons/io5";
import { FiUserCheck, FiUserX } from "react-icons/fi";

export function getStatusIcon(status: string) {
  switch (status) {
    case "ACTIVE":
      return;
    // (
    //   <span className="mx-2 flex rounded-lg border bg-green-50 border-green-200 select-none px-3 py-1 text-xs text-green-600 hover:border-green-300 hover:bg-green-100">
    //     <FiUserCheck className="mr-2 mt-0.5 scale-125" />
    //     Active
    //   </span>
    // );
    case "BANNED":
      return (
        <span className="mx-2 flex select-none rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-600 hover:border-red-300 hover:bg-red-100">
          <FiUserX className="mr-2 mt-0.5 scale-125" />
          Banned
        </span>
      );
    case "DELETED":
      return (
        <span className="mx-2 flex select-none rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-600 hover:border-red-300 hover:bg-red-100">
          <IoCloseSharp className="mr-2 mt-0.5 scale-125" />
          Deleted
        </span>
      );
    case "PENDING":
      return (
        <span className="mx-2 flex select-none rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-600 hover:border-amber-300 hover:bg-amber-100">
          <IoTimeOutline className="mr-2 mt-0.5 scale-125" />
          Pending
        </span>
      );
    case "PUBLISHED":
      return;
    // (
    //   <span className="mx-2 flex rounded-lg border bg-green-50 border-green-200 px-3 py-1 text-xs select-none text-green-600 hover:border-green-300 hover:bg-green-100">
    //     <IoMdCheckmark className="mr-2 mt-0.5 scale-125" />
    //     Published
    //   </span>
    // );
    case "REJECTED":
      return (
        <span className="mx-2 flex select-none rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-600 hover:border-red-300 hover:bg-red-100">
          <IoCloseSharp className="mr-2 mt-0.5 scale-125" />
          Rejected
        </span>
      );
    default:
      return;
  }
}
