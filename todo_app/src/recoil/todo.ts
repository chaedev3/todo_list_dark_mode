import { atom } from "recoil";

export interface TodoTypes {
  id: number;
  texts: string;
  done: boolean;
}

export const inputState = atom<string>({
  key: "inputState",
  default: "",
});

export const todoListState = atom<TodoTypes[]>({
  key: "todoLsitState",
  default: [],
});
