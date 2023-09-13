import React from "react";
import { useAppSelector } from "@/redux//hooks";
import { RiDeleteBin6Line as Delete } from "react-icons/ri";
export function EditorLayout({
  children,
  handleUpdate,
  handleCreate,
  handleDelete,
}: // isSubmitting,
IEditorLayoutProps) {
  const editor = useAppSelector((state) => state.editor);

  return (
    <form
      className="mx-auto flex w-full flex-col items-start justify-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="mt-4 grid w-full gap-x-6 gap-y-8 rounded-[12px] border border-[#c8c8c8] bg-[#ebeaea] px-6 py-6  transition-all duration-300 hover:border-[#c1c1c1] sm:grid-cols-2">
        {children}
        <div
          id="buttons-row"
          className="flex w-full flex-row items-center justify-end sm:col-span-2"
        >
          {/* show delete button only in edit mode */}
          {editor.purpose === "Edit" && (
            <button
              type="button"
              className="mx-3  inline-flex items-center  justify-center px-4 py-2 text-sm font-semibold text-dark-2 transition-all hover:text-[#bc2f2f]"
              onClick={handleDelete}
              // disabled={isSubmitting}
            >
              <Delete className="mb-1 mr-2" /> Delete {editor.entity ?? ""}
            </button>
          )}
          <button
            type="submit"
            onClick={editor.purpose === "Edit" ? handleUpdate : handleCreate}
            // disabled={isSubmitting}
            className="group  flex flex-row justify-center rounded-xl border border-[#5c2c1d2b] bg-[#ff7263] px-6 py-1.5 text-sm font-semibold text-[#ffffffd3] shadow-sm transition-all duration-200 [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] hover:border-[#5c2c1d66]  hover:shadow-md"
          >
            <span className="cursor-pointer transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:[text-shadow:_0_2px_0_rgb(0_0_0_/_15%)]">
              {editor.purpose === "Edit"
                ? `Update ${editor.entity ?? ""}`
                : `Submit ${editor.entity ?? ""}`}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

// --- TYPES --- //

interface IEditorLayoutProps {
  children: React.ReactNode;
  handleUpdate: (e: React.MouseEvent) => void;
  handleCreate: (e: React.MouseEvent) => void;
  handleDelete: (e: React.MouseEvent) => void;
  // isSubmitting: boolean;
}
