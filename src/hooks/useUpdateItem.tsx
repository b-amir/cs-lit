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
  authorId: string;
  email: string;
  username: string;
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
        void ctx.topic.getByCategoryId.invalidate();
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
        void ctx.analogy.getAll.invalidate();
        toast.success("Analogy updated successfully.");
      },
      onError: (e) => {
        toast.error("Something went wrong");
        console.log(e);
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
}
