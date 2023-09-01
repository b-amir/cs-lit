import slugify from "slugify";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { type Category } from "@prisma/client";
import { addActivityLog } from "@/utils/addActivityLog";
import { type GeneralInputType } from "./types";

export function useCreateItem(
  item: GeneralInputType,
  type: string
): () => void {
  const ctx = api.useContext();

  // adding activity log entry
  const createActivityLogEntry = addActivityLog();
  const { data: sessionData } = useSession();

  if (type === "Categories") {
    const { mutate: createCategory } = api.category.create.useMutation({
      onSuccess: () => {
        createActivityLogEntry({
          entityType: "category",
          entityId: "",
          entityTitle: item.name as string,
          action: "created",
        });
        void ctx.category.getAll.invalidate();
        void ctx.category.getAllWithQuery.invalidate();
        const isModerator = ["ADMIN", "EDITOR"].includes(
          sessionData?.user.role ?? ""
        );
        if (isModerator) {
          toast.success("Category created successfully.");
        } else {
          toast.success("Thanks for your suggestion!");
        }
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          if (errorMessage.name) {
            toast.error(errorMessage?.name.join(" "));
          }
        } else if (
          e.message.includes("Unique constraint failed on the fields: (`name`)")
        ) {
          toast.error("A category with the same name already exists.");
        } else if (e.message.includes("UNAUTHORIZED")) {
          toast.error("You need to sign in first.");
        } else {
          toast.error("Something went wrong.");
        }
      },
    });

    const createCategoryHandler = () => {
      try {
        const categorySlug = slugify(item.name as string, { lower: true });

        createActivityLogEntry({
          entityType: "category",
          entityId: item.id as string,
          entityTitle: item.name as string,
          action: "created",
        });

        createCategory({
          name: item.name as string,
          slug: categorySlug,
          id: item.id !== "" ? (item.id as string) : "",
        });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return createCategoryHandler;
  }

  if (type === "Topics") {
    const topicSlug = slugify(item.title as string, { lower: true });

    const { mutate: createTopic } = api.topic.create.useMutation({
      onSuccess: () => {
        void ctx.topic.getByCategoryId.invalidate();
        window.scrollTo({
          top: document.body.offsetTop - 90,
          behavior: "smooth",
        });
        toast.success("Topic created successfully.");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
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
        } else if (
          e.message.includes("Unique constraint failed on the fields: (`slug`)")
        ) {
          toast.error("A topic with the same name already exists.");
        } else {
          toast.error("Something went wrong.");
        }
      },
    });

    const createTopicHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "topic",
          entityId: item.id as string,
          entityTitle: item.title as string,
          action: "created",
        });
        createTopic({
          id: item.id !== "" ? (item.id as string) : "",
          title: item.title as string,
          url: item.url as string,
          slug: topicSlug,
          category: item.category as Category,
          starter: { id: sessionData?.user?.id ?? "" },
          analogies: [
            {
              id: "",
              description: item.firstAnalogy as string,
              reference: item.reference,
            },
          ],
        });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return createTopicHandler;
  }

  if (type === "Analogies") {
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
        if (errorMessage) {
          if (errorMessage.description) {
            toast.error(errorMessage?.description.join(" "));
          }
          if (errorMessage.reference) {
            toast.error(errorMessage?.reference.join(" "));
          }
        } else {
          toast.error("Something went wrong.");
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
          id: item.id as string,
          title: item.title,
          description: item.description as string,
          reference: item.reference,
          status: item.status,
          pinned: item.pinned,
          topicId: item.topicId as string,
          authorId: item.authorId,
        });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return createAnalogyHandler;
  }

  if (type === "Comments") {
    const { mutate: createComment } = api.comment.create.useMutation({
      onSuccess: () => {
        void ctx.comment.getByAnalogyId.invalidate();

        const commentsSection = document?.getElementById("comments-section");
        if (commentsSection) {
          window.scrollTo({
            top: commentsSection.offsetTop - 90,
            behavior: "smooth",
          });
        }

        toast.success("You posted your comment!");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          if (errorMessage.content) {
            toast.error(errorMessage?.content.join(" "));
          } else {
            toast.error("Something went wrong.");
          }
        }
      },
    });

    const createCommentHandler = () => {
      try {
        createActivityLogEntry({
          entityType: "comment",
          entityId: "",
          entityTitle: "",
          action: "created",
        });

        createComment({
          content: item.content as string,
          analogyId: item.analogyId as string,
        });
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    return createCommentHandler;
  }

  // Default return for TypeScript reasons
  return () => {
    console.warn(`Type "${type}" is not handled.`);
  };
}
