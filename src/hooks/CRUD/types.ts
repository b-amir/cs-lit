import { type TopicInput } from "@/pages/[category]/types";
import { type AnalogyInput } from "@/pages/[category]/[topic]/types";
import {
  type ACTIVITY_ACTION,
  type Analogy,
  type Category,
  type ENTITY_TYPE,
} from "@prisma/client";
import { type CommentInput } from "@/pages/[category]/[topic]/[analogy]/types";
import { type AdminInputType, } from "@/pages/admin/types";

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

  item: "string";
  type: "string";
};

export type GeneralInputType = ExtraInput & (AnalogyInput | TopicInput | CommentInput | AdminInputType);
