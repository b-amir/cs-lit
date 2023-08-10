import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { addActivityLog } from "@/utils/addActivityLog";

export interface ITopicInput {
  id: string;
  title: string;
  slug: string;
  name: string;
  url: string;
  category: string;
  firstAnalogy: string;
  description: string;
  status: "PENDING" | "PUBLISHED" | "REJECTED" | "DELETED";
  userStatus: "ACTIVE" | "BANNED" | "DELETED";
  pinned: boolean;
  topicId: string;
  analogyId: string;
  commenterId: string;
  authorId: string;
  email: string;
  username: string;
  content: string;
  role: "ADMIN" | "USER" | "EDITOR";
}

export function useUpdateItem(item: ITopicInput, type: string) {
  const ctx = api.useContext();

  // adding activity log entry
  const createActivityLogEntry = addActivityLog();

  if (type === "Categories") {
    // updating category
    const { mutate: updateCategory } = api.category.update.useMutation({
      onSuccess: () => {
        void ctx.category.getAll.invalidate();
        void ctx.category.getAllWithQuery.invalidate();
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

        updateCategory({ id: item.id, name: item.name, slug: item.slug });
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    };
    return updateCategoryHandler;
  }

  if (type === "Topics") {
    // updating topic
    const { mutate: updateTopic } = api.topic.update.useMutation({
      onSuccess: () => {
        void ctx.topic.getAll.invalidate();
        void ctx.topic.getAllWithQuery.invalidate();
        void ctx.topic.getByCategoryId.invalidate();
        void ctx.pending.getAll.invalidate();
        toast.success("Topic updated successfully.");
      },
    });

    const updateTopicHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "topic",
          entityId: item.id,
          entityTitle: item.title,
          action: "updated",
        });
        updateTopic({
          id: item.id,
          title: item.title,
          slug: item.slug,
          url: item.url,
          status: item.status,
        });
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    };
    return updateTopicHandler;
  }

  if (type === "Analogies") {
    // updating analogy
    const { mutate: updateAnalogy } = api.analogy.update.useMutation({
      onSuccess: () => {
        void ctx.analogy.getByTopicId.reset();
        void ctx.analogy.getAll.invalidate();
        void ctx.analogy.getAllWithQuery.invalidate();
        void ctx.pending.getAll.invalidate();
        toast.success("Analogy updated successfully.");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        console.log(errorMessage);
        if (errorMessage) {
          if (errorMessage.description) {
            toast.error(errorMessage?.description.join(" "));
          } else {
            toast.error("Something went wrong.");
          }
        }
      },
    });

    const updateAnalogyHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "analogy",
          entityId: item.id,
          entityTitle: item.title,
          action: "updated",
        });

        updateAnalogy({
          id: item.id,
          title: item.title,
          description: item.description,
          status: item.status,
          pinned: item.pinned,
          topicId: item.topicId,
          authorId: item.authorId,
        });
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    };
    return updateAnalogyHandler;
  }

  if (type === "Users") {
    // updating user
    const { mutate: updateUser } = api.profile.update.useMutation({
      onSuccess: () => {
        void ctx.profile.getTopThree.invalidate();
        void ctx.profile.getAllWithQuery.invalidate();
        toast.success("User updated successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
        console.log(e);
      },
    });

    const updateUserHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "user",
          entityId: item.id,
          entityTitle: item.name,
          action: "updated",
        });

        updateUser({
          id: item.id,
          name: item.name,
          email: item.email,
          username: item.username,
          role: item.role,
          status: item.status,
        });
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    };
    return updateUserHandler;
  }

  if (type === "Comments") {
    // updating topic
    const { mutate: updateComment } = api.comment.update.useMutation({
      onSuccess: () => {
        void ctx.comment.getAllWithQuery.invalidate();
        void ctx.comment.getByAnalogyId.invalidate();
        void ctx.pending.getAll.invalidate();
        toast.success("Comment updated successfully.");
      },
    });

    const updateTopicHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "comment",
          entityId: item.id,
          entityTitle: item.content,
          action: "updated",
        });
        updateComment({
          id: item.id,
          content: item.content,
          status: item.status,
          analogyId: item.analogyId,
          commenterId: item.commenterId,
        });
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    };
    return updateTopicHandler;
  }
}
