import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { addActivityLog } from "@/utils/addActivityLog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

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

export function useCreateItem(item: ITopicInput, type: string) {
  const ctx = api.useContext();

  // adding activity log entry
  const createActivityLogEntry = addActivityLog();
  // const [categoryInput, setCategoryInput] = useState({
  //   name: "",
  //   slug: "",
  // });

  if (type === "Categories") {
    // creating category

    const { mutate: createCategory } = api.category.create.useMutation({
      onSuccess: () => {
        setCategoryInput({
          name: "",
          slug: "",
        });
        void ctx.category.getAll.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        console.log(errorMessage);
        if (errorMessage) {
          if (errorMessage.url) {
            toast.error(errorMessage?.url.join(" "));
          }
          if (errorMessage.name) {
            toast.error(errorMessage?.name.join(" "));
          }
        } else {
          toast.error("Something went wrong.");
        }
      },
    });

    const createCategoryHandler = () => {
      try {
        const categorySlug = slugify(categoryInput.name, { lower: true });

        const categoryId = "123";

        createActivityLogEntry({
          entityType: "category",
          entityId: categoryId,
          entityTitle: item.name,
          action: "created",
        });

        createCategory({
          name: item.name,
          slug: categorySlug,
          id: categoryId,
        });
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    };
    return createCategoryHandler;
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
