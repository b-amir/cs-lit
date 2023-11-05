import { type ListItem } from "@/features/AdminPage/types";

export interface USER {
  name?: string | null | undefined;
  email?: string | null | undefined;
}
export function getScreenName(user: {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
  profileImageUrl?: string | null;
} | undefined) {
  return user?.name ? user?.name : user?.email ? user?.email : "unknown"
}

export function getScreenTitle(item: ListItem | null) {
  return item?.title
    ? item?.title
    : item?.content
      ? item?.content
      : item?.name
        ? item?.name
        : item?.id
}
