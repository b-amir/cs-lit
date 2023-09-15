import { type GeneralInputType } from "@/hooks/CRUD/types";
import { type Category, type TOPIC_STATUS } from "@prisma/client";
import { type Dispatch, type SetStateAction } from "react";
import { type EditorState } from "./editorSlice";

export interface IEditorLayoutProps {
  input: GeneralInputType;
  setInput: Dispatch<SetStateAction<GeneralInputType>>;
  type: 'Analogies' | 'Topics';
}

export type TopicInput = {
  id: string;
  title: string;
  url: string;
  category: Category | string;
  firstAnalogy: string;
  slug: string;
  status: TOPIC_STATUS;
  hasReference?: boolean;
  reference?: string;
};

export type AnalogyInput = {
  id?: string;
  description: string;
  topicId: string | undefined;
  hasReference?: boolean | undefined;
  reference?: string | undefined;
};

export interface IButtonsRowProps {
  input: GeneralInputType;
  type: 'Analogies' | 'Topics';
  editor: EditorState
}

export interface IFormTriggerProps {
  newInput: GeneralInputType;
  setInput: React.Dispatch<React.SetStateAction<GeneralInputType>>;
}
