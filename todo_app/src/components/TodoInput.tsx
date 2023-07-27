import { useRecoilState } from "recoil";
import { TodoTypes, inputState, todoListState } from "../recoil/todo";
import styled from "styled-components";

const AddButton = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
  color: white;
`;

const InputTag = styled.input`
  width: 80%;
  border-top: none;
  border-left: none;
  border-right: none;
`;

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
      <InputTag
        type="text"
        placeholder="Add your information here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <AddButton onClick={addTodo}>Add</AddButton>
    </div>
  );
}
