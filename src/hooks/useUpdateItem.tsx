import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { addActivityLog } from "@/utils/addActivityLog";
import { Input } from "postcss";
import { useState } from "react";

export interface ITopicInput {
  id: string;
  title: string;
  slug: string;
  name: string;
  linkToDocs: string;
  category: string;
  firstAnalogy: string;
}

export function useUpdateItem(item: ITopicInput, type: string) {
  const [input, setInput] = useState({
    name: item.name,
    slug: item.slug,
  });

  const ctx = api.useContext();

  // adding activity log entry
  const createActivityLogEntry = addActivityLog();

  if (type === "Categories") {
    // deleting category
    const { mutate: updateCategory } = api.category.update.useMutation({
      onSuccess: () => {
        void ctx.category.getAll.invalidate();
        toast.success("Category updated successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
        console.log(e);
      },
    });

    const updateCategoryHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "category",
          entityId: item.id,
          entityTitle: item.name,
          action: "updated",
        });

        updateCategory({ id: item.id, name: input.name, slug: Input.slug });
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    };
    return updateCategoryHandler;
  }

  if (type === "Topics") {
    // deleting topic
    const { mutate: deleteTopic } = api.topic.delete.useMutation({
      onSuccess: () => {
        void ctx.topic.getAll.invalidate();
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
        console.log(e);
      }
    };
    return deleteTopicHandler;
  }

  if (type === "Analogies") {
    // deleting analogy
    const { mutate: deleteAnalogy } = api.analogy.delete.useMutation({
      onSuccess: () => {
        void ctx.analogy.getAll.invalidate();
        toast.success("Analogy deleted successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
        console.log(e);
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
        console.log(e);
      }
    };
    return deleteAnalogyHandler;
  }

  if (type === "Users") {
    // deleting user
    const { mutate: deleteUser } = api.profile.delete.useMutation({
      onSuccess: () => {
        void ctx.profile.getAll.invalidate();
        toast.success("User deleted successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
        console.log(e);
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
        console.log(e);
      }
    };
    return deleteUserHandler;
  }

  // if (type === "Comments") {
  //   // deleting comment
  //   const { mutate: deleteComment } = api.comment.delete.useMutation({
  //     onSuccess: () => {
  //       void ctx.comment.getAll.invalidate();
  //       toast.success("Comment deleted successfully.");
  //     },
  //     onError: (e) => {
  //       toast.error("Something went wrong");
  //       console.log(e);
  //     },
  //   });

  //   const deleteCommentHandler = () => {
  //     try {
  //       createActivityLogEntry({
  //         entityType: "comment",
  //         entityId: item.id,
  //         entityTitle: item.title,
  //         action: "deleted",
  //       });
  //       deleteComment({ id: item.id });
  //     } catch (e) {
  //       toast.error("Something went wrong");
  //       console.log(e);
  //     }
  //   };
  //   return deleteCommentHandler;
  // }
}
