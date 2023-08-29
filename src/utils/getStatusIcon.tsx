// import { IoMdCheckmark } from "react-icons/io";
import { IoCloseSharp, IoTimeOutline } from "react-icons/io5";
import {
  // FiUserCheck,
  FiUserX,
} from "react-icons/fi";

export function getStatusIcon(status: string) {
  switch (status) {
    case "ACTIVE":
      return;
    // (
    //   <span title="Active" className="mx-2 flex h-6 w-6 rounded-full border bg-green-50 border-green-200 items-center justify-center select-none text-xs text-green-600 hover:border-green-300 hover:bg-green-100">
    //     <FiUserCheck className="scale-150" />
    //     Active
    //   </span>
    // );
    case "BANNED":
      return (
        <span
          title="Banned"
          className="mx-2 flex h-6 w-6 select-none items-center justify-center rounded-full border border-red-200 bg-red-50  text-xs text-red-600 hover:border-red-300 hover:bg-red-100"
        >
          <FiUserX className="scale-150" />
          {/* Banned */}
        </span>
      );
    case "DELETED":
      return (
        <span
          title="Deleted"
          className="mx-2 flex h-6 w-6 select-none items-center justify-center rounded-full border border-red-200 bg-red-50  text-xs text-red-600 hover:border-red-300 hover:bg-red-100"
        >
          <IoCloseSharp className="scale-150" />
          {/* Deleted */}
        </span>
      );
    case "PENDING":
      return (
        <span
          title="Pending"
          className="mx-2 flex h-6 w-6 select-none items-center justify-center rounded-full border border-amber-200 bg-amber-50  text-xs text-amber-600 hover:border-amber-300 hover:bg-amber-100"
        >
          <IoTimeOutline className="scale-150" />
          {/* Pending */}
        </span>
      );
    case "PUBLISHED":
      return;
    // (
    //   <span title="Published" className="mx-2 flex h-6 w-6 rounded-full border bg-green-50 items-center justify-center border-green-200  text-xs select-none text-green-600 hover:border-green-300 hover:bg-green-100">
    //     <IoMdCheckmark className="scale-150" />
    //     Published
    //   </span>
    // );
    case "REJECTED":
      return (
        <span
          title="Rejected"
          className="mx-2 flex h-6  w-6 select-none items-center justify-center rounded-full border border-red-200 bg-red-50 text-xs text-red-600 hover:border-red-300 hover:bg-red-100"
        >
          <IoCloseSharp className="scale-150" />
          {/* Rejected */}
        </span>
      );
    default:
      return;
  }
}
