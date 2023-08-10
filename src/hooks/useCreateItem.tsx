import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { addActivityLog } from "@/utils/addActivityLog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";
import { useSession } from "next-auth/react";

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
  categoryId: string;
  reference: string;
  email: string;
  username: string;
  linkToDocs: string;
  role: "ADMIN" | "USER" | "EDITOR";
}

export function useCreateItem(item: ITopicInput, type: string) {
  const ctx = api.useContext();

  // adding activity log entry
  const createActivityLogEntry = addActivityLog();
  const { data: sessionData, status: sessionStatus } = useSession();

  // const [categoryInput, setCategoryInput] = useState({
  //   name: "",
  //   slug: "",
  // });

  // if (type === "Categories") {
  //   // creating category

  //   const { mutate: createCategory } = api.category.create.useMutation({
  //     onSuccess: () => {
  //       setCategoryInput({
  //         name: "",
  //         slug: "",
  //       });
  //       void ctx.category.getAll.invalidate();
  //     },
  //     onError: (e) => {
  //       const errorMessage = e.data?.zodError?.fieldErrors;
  //       console.log(errorMessage);
  //       if (errorMessage) {
  //         if (errorMessage.url) {
  //           toast.error(errorMessage?.url.join(" "));
  //         }
  //         if (errorMessage.name) {
  //           toast.error(errorMessage?.name.join(" "));
  //         }
  //       } else {
  //         toast.error("Something went wrong.");
  //       }
  //     },
  //   });

  //   const createCategoryHandler = () => {
  //     try {
  //       const categorySlug = slugify(categoryInput.name, { lower: true });

  //       const categoryId = "123";

  //       createActivityLogEntry({
  //         entityType: "category",
  //         entityId: categoryId,
  //         entityTitle: item.name,
  //         action: "created",
  //       });

  //       createCategory({
  //         name: item.name,
  //         slug: categorySlug,
  //         id: categoryId,
  //       });
  //     } catch (e) {
  //       toast.error("Something went wrong");
  //       console.log(e);
  //     }
  //   };
  //   return createCategoryHandler;
  // }

  if (type === "Topics") {
    // creating topic
    const topicSlug = slugify(item.title, { lower: true });

    const { mutate: createTopic } = api.topic.create.useMutation({
      onSuccess: () => {
        void ctx.topic.getAll.invalidate();
        void ctx.topic.getByCategoryId.invalidate();
        toast.success("Topic created successfully.");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        // console.log(errorMessage);
        if (errorMessage) {
          if (errorMessage.url) {
            toast.error(errorMessage?.url.join(" "));
          }
          if (errorMessage.title) {
            toast.error(errorMessage?.title.join(" "));
          }
          if (errorMessage.analogies) {
            toast.error(errorMessage?.analogies.join(" "));
          }
        } else {
          if (
            e.message.includes(
              "Unique constraint failed on the fields: (`slug`)"
            )
          ) {
            toast.error("A topic with the same name already exists.");
          } else {
            toast.error("Something went wrong.");
          }
        }
      },
    });

    const createTopicHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "topic",
          entityId: item.id,
          entityTitle: item.title,
          action: "created",
        });
        createTopic({
          id: item.id !== "" ? item.id : "",
          title: item.title,
          url: item.url,
          slug: topicSlug,
          category: item.category,
          starter: { id: sessionData?.user?.id! },
          analogies: [
            {
              id: "",
              description: item.firstAnalogy,
              reference: item.reference,
            },
          ],
        });
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    };
    return createTopicHandler;
  }

  if (type === "Analogies") {
    // creating analogy
    const { mutate: createAnalogy } = api.analogy.create.useMutation({
      onSuccess: () => {
        void ctx.analogy.getAll.invalidate();
        void ctx.analogy.getByTopicId.invalidate();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        toast.success("Analogy created successfully.");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        console.log(errorMessage);
        if (errorMessage) {
          if (errorMessage.description) {
            toast.error(errorMessage?.description.join(" "));
          }
          if (errorMessage.reference) {
            toast.error(errorMessage?.reference.join(" "));
          } else {
            toast.error("Something went wrong.");
          }
        }
      },
    });

    const createAnalogyHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "analogy",
          entityId: "",
          entityTitle: "",
          action: "created",
        });

        createAnalogy({
          id: item.id,
          title: item.title,
          description: item.description,
          reference: item.reference,
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
    return createAnalogyHandler;
  }

  // if (type === "Users") {
  //   // updating user
  //   const { mutate: updateUser } = api.profile.update.useMutation({
  //     onSuccess: () => {
  //       void ctx.profile.getTopThree.invalidate();
  //       toast.success("User updated successfully.");
  //     },
  //     onError: (e) => {
  //       toast.error("Something went wrong");
  //       console.log(e);
  //     },
  //   });

  //   const updateUserHandler = () => {
  //     try {
  //       createActivityLogEntry({
  //         entityType: "user",
  //         entityId: item.id,
  //         entityTitle: item.name,
  //         action: "updated",
  //       });

  //       updateUser({
  //         id: item.id,
  //         name: item.name,
  //         email: item.email,
  //         username: item.username,
  //         role: item.role,
  //         status: item.status,
  //       });
  //     } catch (e) {
  //       toast.error("Something went wrong");
  //       console.log(e);
  //     }
  //   };
  //   return updateUserHandler;
  // }
}
