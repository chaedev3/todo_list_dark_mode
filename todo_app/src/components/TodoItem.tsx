import { useRecoilState } from "recoil";
import { TodoTypes, todoListState } from "../recoil/todo";

export default function TodoItem({ todo }: { todo: TodoTypes }) {
  // 값을 불러오고 변경도 해야할 때 useRecoilState
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoListState);
  const changeDoneHandler = (id: number) => {
    setTodos(
      todos.map((todo: TodoTypes) => {
        return todo.id === id ? { ...todo, done: !todo.done } : todo;
      })
    );
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo: TodoTypes) => todo.id !== id));
  };

  return (
    <div>
      <input type="checkbox" onClick={() => changeDoneHandler(todo.id)} />
      <p>{todo.id}</p>
      {todo.done ? (
        <p style={{ textDecorationLine: "line-through" }}>{todo.texts}</p>
      ) : (
        <p>{todo.texts}</p>
      )}
      <button onClick={() => deleteTodo(todo.id)}>삭제!!</button>
    </div>
  );
}
