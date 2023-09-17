import { type Topic } from "@prisma/client";
import { type SpringValue } from "@react-spring/web";

export interface IExtendedTopic extends Topic {
  category: {
    name: string;
    slug: string;
  };
}
export interface IResultsProps {
  panelAnimation: { transform: SpringValue<string> };
  results?: IExtendedTopic[];
  searchQuery: string;
  debouncedSearch: string;
  loading: boolean;
  setShowResultsPanel: (value: boolean) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  searchInputRef: React.RefObject<HTMLInputElement>;
  setSearchQuery: (value: string) => void;
}
export interface IHomeSearchInputProps {
  homepage: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  searchInputRef: React.RefObject<HTMLInputElement>;
  setSearchQuery: (value: string) => void;
  setShowResultsPanel: (value: boolean) => void;
}
export interface IShownResultsProps {
  smallQuery: boolean;
  haveResults?: boolean;
  debouncedSearch: string;
  results?: IExtendedTopic[];
  searchQuery: string;
  loading: boolean;
}