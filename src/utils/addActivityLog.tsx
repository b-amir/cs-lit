import { api } from "@/utils/api";

export interface IActivityLogProps {
  entityType: "category" | "topic" | "analogy" | "comment" | "user";
  entityId: string;
  entityTitle: string;
  action: "created" | "updated" | "deleted";
}

export function addActivityLog() {
  const { mutate: createEntry } = api.activity.create.useMutation();

  const createActivityLogEntry = ({
    entityType,
    entityId,
    entityTitle,
    action,
  }: IActivityLogProps) => {
    createEntry({ entityType, entityId, entityTitle, action });
  };
  return createActivityLogEntry;
}
