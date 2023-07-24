import { TodoTypes, todoListState } from "../recoil/todo";
import TodoItem from "./TodoItem";
import { useRecoilValue } from "recoil";
export default function TodoList() {
  const todos = useRecoilValue<TodoTypes[]>(todoListState);
  return (
    <div>
      {!todos ? (
        <p>오늘 할 일이 없나요?</p>
      ) : (
        todos.map((todo: TodoTypes) => <TodoItem todo={todo} key={todo.id} />)
      )}
    </div>
  );
}
