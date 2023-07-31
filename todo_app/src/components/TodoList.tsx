import { TodoTypes, todoListState } from "../recoil/todo";
import TodoItem from "./TodoItem";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Todos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 2%;
`;
export default function TodoList() {
  const todos = useRecoilValue<TodoTypes[]>(todoListState);
  return (
    <Todos>
      {!todos ? (
        <p>오늘 할 일이 없나요?</p>
      ) : (
        todos.map((todo: TodoTypes) => <TodoItem todo={todo} key={todo.id} />)
      )}
    </Todos>
  );
}
