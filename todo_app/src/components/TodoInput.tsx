import { useRecoilState } from "recoil";
import { TodoTypes, inputState, todoListState } from "../recoil/todo";
import styled from "styled-components";

const Input = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const AddButton = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  border: none;
  padding: 5px;
  border-radius: 10px;
  color: white;
`;

const InputTag = styled.input`
  width: 90%;
  border: none;
  background-color: ${(props) => props.theme.pgColor};
  color: ${(props) => props.theme.textColor};
  &:focus {
    outline: none;
  }
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
    <Input>
      <InputTag
        type="text"
        placeholder="Add your information here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <AddButton onClick={addTodo}>Add</AddButton>
    </Input>
  );
}
