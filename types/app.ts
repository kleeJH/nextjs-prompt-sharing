import { MouseEventHandler } from "react";

type TypeUser = {
  username: string;
  email: string;
  image: string;
  _id: string;
  __v: number;
};

type TypePrompt = {
  _id: string;
  creator: TypeUser;
  prompt: string;
  tag: string;
  __v: number;
};

type TypeProfile = {
  name: string;
  desc: string;
  data: TypePrompt[];
  handleEdit?: (prompt: TypePrompt) => void;
  handleDelete?: (id: string) => void;
};

type TypePromptCard = {
  prompt: TypePrompt;
  handleTagClick?: Function;
  handleEdit?: (prompt: TypePrompt) => void;
  handleDelete?: (id: string) => void;
};

export type { TypeUser, TypePrompt, TypeProfile, TypePromptCard };
