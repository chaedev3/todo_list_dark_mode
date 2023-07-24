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
  default: [
    {
      id: 0,
      texts: "리액트 배우기",
      done: false,
    },
    {
      id: 1,
      texts: "Typescript 배우기",
      done: false,
    },
  ],
});
