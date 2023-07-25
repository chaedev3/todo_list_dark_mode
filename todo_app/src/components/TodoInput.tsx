import { useRecoilState } from "recoil";
import { TodoTypes, inputState, todoListState } from "../recoil/todo";

export default function TodoInput() {
  const [text, setText] = useRecoilState<string>(inputState);
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoListState);

  // 할 일 추가
  const addTodo = () => {
    if (!text.trim()) {
      return;
    }
    const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
    const todo: TodoTypes = {
      id: nextId,
      texts: text,
      done: false,
    };
    setTodos((prev) => [...prev, todo]);
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="할 일을 입력해주세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>할 일 추가</button>
    </div>
  );
}
