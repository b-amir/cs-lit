import React from "react";
import { archivo } from "@/styles/customFonts";
import { useAdminEditorForm } from "@/hooks/useAdminEditorForm";
import { MdClose, MdOutlineModeEdit } from "react-icons/md";
import {
  type FormField,
  type FormProps,
  type EditorModalProps,
  type EditorBodyBlueprint,
} from "./types";

export function EditorModal({ children, shown, setShown }: EditorModalProps) {
  return (
    <>
      {shown && (
        <div
          id="editor-modal-bg"
          // full page modal
          className="fixed inset-0 z-[9999]  m-auto  flex h-screen w-screen items-center  justify-center overflow-hidden bg-black bg-opacity-70 backdrop-blur-sm"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={() => setShown(false)}
        >
          <div
            id="editor-modal-box"
            // full page modal
            className=" mx-auto my-auto flex  w-2/5 flex-col  overflow-clip rounded-[17px] bg-white shadow-md"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              id="editor-modal-header"
              className={` ${archivo.className} flex h-12 w-full flex-row items-center justify-between  border-b bg-gray-50 p-10 text-3xl font-bold`}
            >
              <span className="flex flex-row">
                <MdOutlineModeEdit className="mr-2 mt-0.5 scale-90" />
                Edit Item
              </span>
              <MdClose
                className="h-11 w-11 cursor-pointer rounded-full p-2 transition-all hover:bg-gray-100 "
                onClick={() => setShown(false)}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
export function EditorBodyBlueprint({
  input,
  setShown,
  setInput,
  fields,
}: EditorBodyBlueprint) {
  // use the custom hook to handle all the input changes and save logic
  const { handleSave, handleChange } = useAdminEditorForm(
    input,
    setInput,
    setShown
  );

  return (
    <form id="editor-modal-body" className="h-full px-8 py-8">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            {field.label}
          </label>
          {field.variety === "select" ? (
            <select
              name={field.name}
              id={field.name}
              value={input.item[field.name] || ""}
              onChange={handleChange}
              className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <>
              {field.variety === "checkbox" ? (
                <input
                  type="checkbox"
                  name={field.name}
                  id={field.name}
                  checked={input.item[field.name] || false}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  name={field.name}
                  id={field.name}
                  value={input.item[field.name] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                />
              )}
            </>
          )}
        </div>
      ))}
      <div
        id="editor-modal-buttons"
        className="flex h-12 w-full flex-row items-center justify-end  pb-4 pt-14 "
      >
        <button
          className="px-2 py-2 pr-5 text-sm font-semibold text-gray-500 transition-all hover:underline"
          onClick={() => setShown(false)}
        >
          cancel
        </button>
        <button
          onClick={handleSave}
          className="group  flex flex-row justify-center rounded-xl
            border border-[#5c2c1d2b] bg-[#ff7263] px-6 py-1.5 text-sm font-semibold text-[#ffffffd3] shadow-sm transition-all
            duration-200 [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] hover:border-[#5c2c1d66] hover:shadow-md"
        >
          <span className="cursor-pointer transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:[text-shadow:_0_2px_0_rgb(0_0_0_/_15%)]">
            Save
          </span>
        </button>
      </div>
    </form>
  );
}
// ------------------------------------------------------
// --- each entity type has a different form body: --- //
// ------------------------------------------------------
export function CategoryEditForm({ input, setShown, setInput }: FormProps) {
  const fields: FormField[] = [
    { name: "name", label: "Title", variety: "text" },
    { name: "slug", label: "Slug", variety: "text" },
    {
      name: "status",
      label: "Status",
      variety: "select",
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "PUBLISHED", label: "Published" },
        { value: "REJECTED", label: "Rejected" },
        { value: "DELETED", label: "Deleted" },
      ],
    },
  ];

  return (
    <EditorBodyBlueprint
      input={input}
      setShown={setShown}
      setInput={setInput}
      fields={fields}
      type="category"
    />
  );
}
export function TopicEditForm({ input, setShown, setInput }: FormProps) {
  const fields: FormField[] = [
    { name: "title", label: "Title", variety: "text" },
    { name: "slug", label: "Slug", variety: "text" },
    { name: "url", label: "URL", variety: "text" },
    {
      name: "status",
      label: "Status",
      variety: "select",
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "PUBLISHED", label: "Published" },
        { value: "REJECTED", label: "Rejected" },
        { value: "DELETED", label: "Deleted" },
      ],
    },
  ];

  return (
    <EditorBodyBlueprint
      input={input}
      setShown={setShown}
      setInput={setInput}
      fields={fields}
      type="topic"
    />
  );
}
export function AnalogyEditForm({ input, setShown, setInput }: FormProps) {
  const fields: FormField[] = [
    { name: "title", label: "Title", variety: "text" },
    { name: "description", label: "Description", variety: "text" },
    { name: "pinned", label: "Pinned", variety: "checkbox" },
    {
      name: "status",
      label: "Status",
      variety: "select",
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "PUBLISHED", label: "Published" },
        { value: "REJECTED", label: "Rejected" },
        { value: "DELETED", label: "Deleted" },
      ],
    },
  ];

  return (
    <EditorBodyBlueprint
      input={input}
      setShown={setShown}
      setInput={setInput}
      fields={fields}
      type="analogy"
    />
  );
}
export function UserEditForm({ input, setShown, setInput }: FormProps) {
  const fields: FormField[] = [
    { name: "username", label: "Username", variety: "text" },
    { name: "name", label: "Name", variety: "text" },
    { name: "email", label: "Email", variety: "text" },
    {
      name: "role",
      label: "Role",
      variety: "select",
      options: [
        { value: "ADMIN", label: "Admin" },
        { value: "EDITOR", label: "Editor" },
        { value: "USER", label: "User" },
      ],
    },
    {
      name: "status",
      label: "Status",
      variety: "select",
      options: [
        { value: "ACTIVE", label: "Active" },
        { value: "BANNED", label: "Banned" },
        { value: "DELETED", label: "Deleted" },
      ],
    },
  ];

  return (
    <EditorBodyBlueprint
      input={input}
      setShown={setShown}
      setInput={setInput}
      fields={fields}
      type="user"
    />
  );
}
export function CommentEditForm({ input, setShown, setInput }: FormProps) {
  const fields: FormField[] = [
    { name: "content", label: "Content", variety: "text" },
    {
      name: "status",
      label: "Status",
      variety: "select",
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "PUBLISHED", label: "Published" },
        { value: "REJECTED", label: "Rejected" },
        { value: "DELETED", label: "Deleted" },
      ],
    },
  ];

  return (
    <EditorBodyBlueprint
      input={input}
      setShown={setShown}
      setInput={setInput}
      fields={fields}
      type="comment"
    />
  );
}
