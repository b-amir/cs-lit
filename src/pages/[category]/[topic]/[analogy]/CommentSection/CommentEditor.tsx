import { useCreateItem } from "@/hooks/CRUD/useCreateItem";
import { useEffect, useState } from "react";
import { type CommentInput, type ICommentEditorProps } from "../types";

export function CommentEditor({ analogyId }: ICommentEditorProps) {
  const [commentInput, setCommentInput] = useState({
    content: "",
    analogyId: analogyId,
  });

  // --- getting analogyId at first page load --- //
  useEffect(() => {
    if (analogyId) {
      setCommentInput({ ...commentInput, analogyId: analogyId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const item = commentInput as CommentInput;
  const type = "Comments";

  const createItem = useCreateItem(item, type);
  const handleCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    setCommentInput({ analogyId: analogyId, content: "" });
    createItem();
  };

  return (
    <div id="comment-editor">
      <form
        action=""
        className="my-4 flex flex-col hover:border-gray-400 focus:shadow-sm"
      >
        <textarea
          id="comment-input"
          className={`w-full cursor-pointer resize-none border border-[#ffffff45] bg-[#ffffff45] px-3 py-2 text-sm placeholder-gray-500 transition-all duration-200 hover:bg-[#ffffff6c] focus:cursor-text focus:bg-white focus:outline-none ${
            commentInput.content.trim() === "" ? "rounded-md" : "rounded-t-md"
          }`}
          placeholder="Write your comment here..."
          rows={commentInput.content.trim() === "" ? 1 : 3}
          value={commentInput.content}
          onChange={(e) =>
            setCommentInput({
              ...commentInput,
              content: e.target.value,
            })
          }
        />

        {commentInput.content.trim() === "" ? null : (
          <button
            type="submit"
            className="w-full rounded-b-md border-t border-[#55545432] border-gray-300 bg-gray-100 py-2 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-200 "
            onClick={handleCreate}
          >
            send
          </button>
        )}
      </form>
    </div>
  );
}
