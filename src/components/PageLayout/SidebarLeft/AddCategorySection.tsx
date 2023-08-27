import { useState } from "react";
import { RiMenuAddFill, RiAddFill } from "react-icons/ri";
import { type Category } from "@prisma/client";
import { useCreateItem } from "@/hooks/useCreateItem";
import { useSession } from "next-auth/react";

export function AddCategorySection() {
  const { data: sessionData } = useSession();
  const [input, setInput] = useState({
    name: "",
    slug: "",
    id: "",
  });
  const item = input as Category;
  const type = "Categories";
  const createItem = useCreateItem(item, type);
  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createItem();
    setInput({ name: "", slug: "", id: "" });
  };

  const isModerator = ["ADMIN", "EDITOR"].includes(
    sessionData?.user.role ?? ""
  );
  return (
    <form
      className=" mx-auto my-4 flex w-full flex-row items-center justify-center gap-0 px-3 align-middle text-xs font-medium lg:text-sm"
      onSubmit={handleCreate}
    >
      {input.name.length >= 3 ? (
        <RiAddFill
          className="w-1/6 cursor-pointer hover:text-gray-500"
          type="submit"
          onClick={handleCreate}
        />
      ) : (
        <RiMenuAddFill className="w-1/6" />
      )}
      <input
        className="w-5/6 items-center rounded-md border border-[#2A2A2E00] bg-[#ffffff00] px-2 py-1  text-xs text-[#2A2A2E] placeholder-gray-500 outline-none transition-all placeholder:font-medium hover:border-[#2A2A2E23] hover:bg-[#e8e8e845] focus:border-[#2A2A2E23] focus:bg-[#e8e8e845] focus:outline-none"
        type="text"
        placeholder={isModerator ? "Add category" : "Suggest category"}
        value={input.name}
        onChange={(event) => setInput({ ...input, name: event.target.value })}
      />
    </form>
  );
}
