import { useState } from "react";
import { RiMenuAddFill } from "react-icons/ri";
import { type Category } from "@prisma/client";
import { useCreateItem } from "@/hooks/useCreateItem";

export function AddCategorySection() {
  const [input, setInput] = useState({
    name: "",
    slug: "",
    id: "",
  });
  const item = input as Category;
  const type = "Categories";
  const createItem = useCreateItem(item, type);
  const handleCreate = (e) => {
    e.preventDefault();
    createItem();
    setInput({ name: "", slug: "", id: "" });
  };
  return (
    <form
      className=" mx-auto my-4 flex w-full flex-row items-center justify-center gap-0 px-3 align-middle text-xs font-medium lg:text-sm"
      onSubmit={handleCreate}
    >
      {input.name.length >= 3 ? (
        <button
          type="submit"
          className="w-1/6 text-lg font-bold"
          onClick={handleCreate}
        >
          +
        </button>
      ) : (
        <RiMenuAddFill className="w-1/6" />
      )}
      <input
        className="w-5/6 rounded-lg border border-[#2A2A2E00] bg-[#ffffff00] px-3 py-1 text-[#2A2A2E] placeholder-gray-500 outline-none transition-all placeholder:font-medium hover:border-[#2A2A2E23] hover:bg-[#e8e8e845] focus:outline-none"
        type="text"
        placeholder="Add category"
        value={input.name}
        onChange={(event) => setInput({ ...input, name: event.target.value })}
      />
    </form>
  );
}
