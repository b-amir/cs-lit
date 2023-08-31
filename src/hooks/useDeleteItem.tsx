import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { addActivityLog } from "@/utils/addActivityLog";
import { type useInputType } from "./useUpdateItem";

export function useDeleteItem(item: useInputType, type: string): () => void {
  const ctx = api.useContext();

  // adding activity log entry
  const createActivityLogEntry = addActivityLog();

  if (type === "Topics") {
    // deleting topic
    const { mutate: deleteTopic } = api.topic.delete.useMutation({
      onSuccess: () => {
        void ctx.topic.getAll.invalidate();
        void ctx.topic.getAllWithQuery.invalidate();
        void ctx.topic.getByCategoryId.invalidate();
        toast.success("Topic deleted successfully.");
      },
    });

    const deleteTopicHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "topic",
          entityId: item.id,
          entityTitle: item.title,
          action: "deleted",
        });
        deleteTopic({ id: item.id });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return deleteTopicHandler;
  }

  if (type === "Categories") {
    // deleting category
    const { mutate: deleteCategory } = api.category.delete.useMutation({
      onSuccess: () => {
        void ctx.category.getAll.invalidate();
        void ctx.category.getAllWithQuery.invalidate();
        toast.success("Category deleted successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
      },
    });

    const deleteCategoryHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "category",
          entityId: item.id,
          entityTitle: item.name,
          action: "deleted",
        });
        deleteCategory({ id: item.id });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return deleteCategoryHandler;
  }

  if (type === "Analogies") {
    // deleting analogy
    const { mutate: deleteAnalogy } = api.analogy.delete.useMutation({
      onSuccess: () => {
        void ctx.analogy.getAll.invalidate();
        void ctx.analogy.getAllWithQuery.invalidate();
        void ctx.analogy.getByTopicId.invalidate();
        toast.success("Analogy deleted successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
      },
    });

    const deleteAnalogyHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "analogy",
          entityId: item.id,
          entityTitle: item.title,
          action: "deleted",
        });
        deleteAnalogy({ id: item.id });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return deleteAnalogyHandler;
  }

  if (type === "Users") {
    // deleting user
    const { mutate: deleteUser } = api.profile.delete.useMutation({
      onSuccess: () => {
        void ctx.profile.getAll.invalidate();
        void ctx.profile.getAllWithQuery.invalidate();
        toast.success("User deleted successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
      },
    });

    const deleteUserHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "user",
          entityId: item.id,
          entityTitle: item.name,
          action: "deleted",
        });
        deleteUser({ id: item.id });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return deleteUserHandler;
  }

  if (type === "Comments") {
    // deleting comment
    const { mutate: deleteComment } = api.comment.delete.useMutation({
      onSuccess: () => {
        void ctx.comment.getAllWithQuery.invalidate();
        void ctx.comment.getByAnalogyId.invalidate();

        toast.success("Comment deleted successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
      },
    });

    const deleteCommentHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "comment",
          entityId: item.id,
          entityTitle: item.content,
          action: "deleted",
        });
        deleteComment({ id: item.id });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return deleteCommentHandler;
  }
  // Default return for TypeScript reasons
  return () => {
    console.warn(`Type "${type}" is not handled.`);
  };
}
