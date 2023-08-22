import React from "react";
import { useUpdateItem } from "@/hooks/useUpdateItem";

import { archivo } from "@/styles/customFonts";
import { MdClose, MdOutlineModeEdit } from "react-icons/md";

// a modal consisting of a form to update the item. but the form input items differ for each item type

export function EditorModal({ children, shown, setShown }) {
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

export function CategoryEditForm({ input, setShown, setInput }) {
  const { item, type } = input;
  const updateItem = useUpdateItem(item, type);

  // input.item,
  // input.type

  const handleSave = (e) => {
    //prevent default
    e.preventDefault();
    setShown(false);
    updateItem();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prev) => {
      return {
        ...prev,
        item: {
          ...prev.item,
          [name]: value,
        },
      };
    });
  };

  return (
    <>
      <form id="editor-modal-body" className="h-full px-8 py-8">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={input?.item?.name ?? ""}
            onChange={handleChange}
            placeholder="Enter title"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="slug"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            defaultValue={input?.item?.slug ?? ""}
            onChange={handleChange}
            placeholder="Enter slug"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            defaultValue={input?.item?.status ?? ""}
            onChange={handleChange}
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="PENDING"> Pending</option>
            <option value="PUBLISHED">Published</option>
            <option value="REJECTED">Rejected</option>
            <option value="DELETED">Deleted</option>
          </select>
        </div>
        <div
          id="editor-modal-buttons"
          // align items at right
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
    </>
  );
}

export function TopicEditForm({ input, setShown, setInput }) {
  const { item, type } = input;
  const updateItem = useUpdateItem(item, type);

  const handleSave = (e) => {
    e.preventDefault();
    setShown(false);
    updateItem();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prev) => {
      return {
        ...prev,
        item: {
          ...prev.item,
          [name]: value,
        },
      };
    });
  };

  return (
    <>
      <form id="editor-modal-body" className="h-full px-8 py-8">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={input?.item?.title ?? ""}
            onChange={handleChange}
            placeholder="Enter title"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="slug"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            defaultValue={input?.item?.slug ?? ""}
            onChange={handleChange}
            placeholder="Enter slug"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="url"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            defaultValue={input?.item?.url ?? ""}
            onChange={handleChange}
            placeholder="Enter url"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            defaultValue={input?.item?.status ?? ""}
            onChange={handleChange}
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="PENDING"> Pending</option>
            <option value="PUBLISHED">Published</option>
            <option value="REJECTED">Rejected</option>
            <option value="DELETED">Deleted</option>
          </select>
        </div>

        <div
          id="editor-modal-buttons"
          // align items at right
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
    </>
  );
}

export function AnalogyEditForm({ input, setShown, setInput }) {
  const { item, type } = input;
  const updateItem = useUpdateItem(item, type);

  // input.item,
  // input.type

  const handleSave = (e) => {
    //prevent default
    e.preventDefault();
    setShown(false);
    updateItem();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prev) => {
      return {
        ...prev,
        item: {
          ...prev.item,
          [name]: value,
        },
      };
    });
  };

  return (
    <>
      <form id="editor-modal-body" className="h-full px-8 py-8">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={input?.item?.title ?? ""}
            onChange={handleChange}
            placeholder="Enter title"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={input?.item?.description ?? ""}
            onChange={handleChange}
            placeholder="Enter description"
            className="focus:shadow-outline mb-2 w-full resize-y appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pinned"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Pinned
          </label>
          <input
            type="checkbox"
            name="pinned"
            id="pinned"
            // defaultValue={input?.item?.pinned ?? ""}
            checked={input?.item?.pinned ?? ""}
            onChange={(e) => {
              const { name, checked } = e.target;
              setInput((prev) => {
                return {
                  ...prev,
                  item: {
                    ...prev.item,
                    [name]: checked,
                  },
                };
              });
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            defaultValue={input?.item?.status ?? ""}
            onChange={handleChange}
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="PENDING"> Pending</option>
            <option value="PUBLISHED">Published</option>
            <option value="REJECTED">Rejected</option>
            <option value="DELETED">Deleted</option>
          </select>
        </div>

        <div
          id="editor-modal-buttons"
          // align items at right
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
    </>
  );
}

export function UserEditForm({ input, setShown, setInput }) {
  const { item, type } = input;
  const updateItem = useUpdateItem(item, type);

  // input.item,
  // input.type

  const handleSave = (e) => {
    //prevent default
    e.preventDefault();
    setShown(false);
    updateItem();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prev) => {
      return {
        ...prev,
        item: {
          ...prev.item,
          [name]: value,
        },
      };
    });
  };

  return (
    <>
      <form id="editor-modal-body" className="h-full px-8 py-8">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={input?.item?.username ?? ""}
            onChange={handleChange}
            placeholder="Enter username"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={input?.item?.name ?? ""}
            onChange={handleChange}
            placeholder="Enter name"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={input?.item?.email ?? ""}
            onChange={handleChange}
            placeholder="Enter email"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Role
          </label>
          <select
            name="role"
            id="role"
            defaultValue={input?.item?.role ?? ""}
            onChange={handleChange}
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="ADMIN"> Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="USER">User</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            defaultValue={input?.item?.status ?? ""}
            onChange={handleChange}
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="ACTIVE"> Active</option>
            <option value="BANNED">Banned</option>
            <option value="DELETED">Deleted</option>
          </select>
        </div>

        <div
          id="editor-modal-buttons"
          // align items at right
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
    </>
  );
}

export function CommentEditForm({ input, setShown, setInput }) {
  const { item, type } = input;
  const updateItem = useUpdateItem(item, type);

  // input.item,
  // input.type

  const handleSave = (e) => {
    //prevent default
    e.preventDefault();
    setShown(false);
    updateItem();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prev) => {
      return {
        ...prev,
        item: {
          ...prev.item,
          [name]: value,
        },
      };
    });
  };

  return (
    <>
      <form id="editor-modal-body" className="h-full px-8 py-8">
        <div className="mb-4">
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Content
          </label>
          <input
            type="text"
            name="content"
            id="content"
            defaultValue={input?.item?.content ?? ""}
            onChange={handleChange}
            placeholder="Enter content"
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            defaultValue={input?.item?.status ?? ""}
            onChange={handleChange}
            className="focus:shadow-outline mb-2 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
          >
            <option value="PENDING"> Pending</option>
            <option value="PUBLISHED">Published</option>
            <option value="REJECTED">Rejected</option>
            <option value="DELETED">Deleted</option>
          </select>
        </div>

        <div
          id="editor-modal-buttons"
          // align items at right
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
    </>
  );
}
