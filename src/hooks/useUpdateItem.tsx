import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { addActivityLog } from "@/utils/addActivityLog";
import {
  type Analogy,
  type Category,
  type ENTITY_TYPE,
  type ACTIVITY_ACTION,
} from "@prisma/client";
import { type TopicInput } from "@/pages/[category]/types";
import { type AnalogyInput } from "@/pages/[category]/[topic]/types";

export type ExtraInput = {
  id?: string;
  title?: string;
  name?: string;
  slug?: string;
  url?: string;

  category?: Category | string;
  firstAnalogy?: string;
  description?: string;
  status?: "PENDING" | "PUBLISHED" | "REJECTED" | "DELETED";
  userStatus?: "ACTIVE" | "BANNED" | "DELETED";

  pinned?: boolean;
  topicId?: string;
  analogyId?: string;
  commenterId?: string;
  authorId?: string;

  email?: string;
  username?: string;
  content?: string;
  role?: "ADMIN" | "USER" | "EDITOR";
  hasReference?: boolean;

  reference?: string;
  analogies?: Analogy[];
  userId?: string;
  entityType?: ENTITY_TYPE;
  entityId?: string;

  entityTitle?: string;
  action?: ACTIVITY_ACTION;
  timestamp?: Date;
};

export type useInputType = ExtraInput & (AnalogyInput | TopicInput);

export function useUpdateItem(item: useInputType, type: string): () => void {
  const ctx = api.useContext();

  // adding activity log entry
  const createActivityLogEntry = addActivityLog();

  if (type === "Categories") {
    const { mutate: updateCategory } = api.category.update.useMutation({
      onSuccess: () => {
        void ctx.category.getAll.invalidate();
        void ctx.category.getAllWithQuery.invalidate();
        toast.success("Category updated successfully.");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });

    const updateCategoryHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "category",
          entityId: item.id as string,
          entityTitle: item.name as string,
          action: "updated",
        });

        updateCategory({
          id: item.id as string,
          name: item.name as string,
          slug: item.slug as string,
          status: item.status as
            | "PENDING"
            | "PUBLISHED"
            | "REJECTED"
            | "DELETED",
        });
      } catch (e) {
        toast.error("Something went wrong");
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
          entityId: item.id as string,
          entityTitle: item.title as string,
          action: "updated",
        });
        updateTopic({
          id: item.id as string,
          title: item.title as string,
          slug: item.slug as string,
          url: item.url as string,
          status: item.status as
            | "PENDING"
            | "PUBLISHED"
            | "REJECTED"
            | "DELETED",
        });
      } catch (e) {
        toast.error("Something went wrong");
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
          entityId: item.id as string,
          entityTitle: item.title as string,
          action: "updated",
        });

        updateAnalogy({
          id: item.id as string,
          title: item.title as string,
          description: item.description as string,
          status: item.status as
            | "PENDING"
            | "PUBLISHED"
            | "REJECTED"
            | "DELETED",
          pinned: item.pinned as boolean,
          topicId: item.topicId as string,
          authorId: item.authorId as string,
        });
      } catch (e) {
        toast.error("Something went wrong");
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
      onError: () => {
        toast.error("Something went wrong");
      },
    });

    const updateUserHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "user",
          entityId: item.id as string,
          entityTitle: item.name as string,
          action: "updated",
        });

        updateUser({
          id: item.id as string,
          name: item.name as string,
          email: item.email as string,
          username: item.username as string,
          role: item.role as "ADMIN" | "USER" | "EDITOR",
          status: item.status as "ACTIVE" | "BANNED" | "DELETED",
        });
      } catch (e) {
        toast.error("Something went wrong");
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
          entityId: item.id as string,
          entityTitle: item.content as string,
          action: "updated",
        });
        updateComment({
          id: item.id as string,
          content: item.content as string,
          status: item.status as
            | "PENDING"
            | "PUBLISHED"
            | "REJECTED"
            | "DELETED",
          analogyId: item.analogyId as string,
          commenterId: item.commenterId as string,
        });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return updateTopicHandler;
  }

  // Default return for TypeScript reasons
  return () => {
    console.warn(`Type "${type}" is not handled.`);
  };
}
