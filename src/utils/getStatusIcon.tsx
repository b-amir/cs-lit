import { IoMdCheckmark } from "react-icons/io";
import { IoCloseSharp, IoTimeOutline } from "react-icons/io5";
import { FiUserCheck, FiUserX } from "react-icons/fi";

export function getStatusIcon(status: string) {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="flex items-center justify-center gap-1 rounded-full border border-[#2d9c2d64] bg-[#d9f9d9b8] px-2 py-1 text-xs font-semibold text-[#2d9c2d]">
          <FiUserCheck className=" mb-0.5 text-lg" />
          Active
        </span>
      );
    case "BANNED":
      return (
        <span className="flex items-center justify-center gap-1 rounded-full border border-[#b9535364] bg-[#f9d9d9b8] px-2 py-1 text-xs font-semibold text-[#b95353]">
          <FiUserX className=" mb-0.5 text-lg" />
          Banned
        </span>
      );
    case "DELETED":
      return (
        <span className="flex items-center justify-center gap-1 rounded-full border border-[#b9535364] bg-[#f9d9d9b8] px-2 py-1 text-xs font-semibold text-[#b95353]">
          <IoCloseSharp className=" mb-0.5 text-lg" />
          Deleted
        </span>
      );
    case "PENDING":
      return (
        <span className="flex items-center justify-center gap-1 rounded-full border border-[#aa8a3f64] bg-[#fffdddb8] px-2 py-1 text-xs font-semibold text-[#aa8a3f]">
          <IoTimeOutline className=" mb-0.5 text-lg" />
          Pending
        </span>
      );
    case "PUBLISHED":
      return (
        <span className="flex items-center justify-center gap-1 rounded-full border border-[#2d9c2d64] bg-[#d9f9d9b8] px-2 py-1 text-xs font-semibold text-[#2d9c2d]">
          <IoMdCheckmark className=" mb-0.5 text-lg" />
          Published
        </span>
      );
    case "REJECTED":
      return (
        <span className="flex items-center justify-center gap-1 rounded-full border border-[#b9535364] bg-[#f9d9d9b8] px-2 py-1 text-xs font-semibold text-[#b95353]">
          <IoCloseSharp className=" mb-0.5 text-lg" />
          Rejected
        </span>
      );
    default:
      return;
  }
}
