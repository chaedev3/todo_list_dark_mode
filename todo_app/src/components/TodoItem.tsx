import { useRecoilState } from "recoil";
import { TodoTypes, todoListState } from "../recoil/todo";
import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../recoil/atom";

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TodoContent = styled.p`
  flex-grow: 1;
  margin: 5px;
  font-size: 16px;
`;
const CustomCheckbox = styled.input.attrs({ type: "checkbox " })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid black;
  background-color: ${(props) =>
    props.checked ? props.theme.pgColor : "#fff"};
`;

export default function TodoItem({ todo }: { todo: TodoTypes }) {
  const isDarkMode = useRecoilValue(isDarkAtom);
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
    <Item>
      <input type="checkbox" onClick={() => changeDoneHandler(todo.id)} />
      {todo.done ? (
        <TodoContent style={{ textDecorationLine: "line-through" }}>
          {todo.texts}
        </TodoContent>
      ) : (
        <TodoContent>{todo.texts}</TodoContent>
      )}
      {isDarkMode ? (
        <TiDeleteOutline
          onClick={() => deleteTodo(todo.id)}
          style={{ color: "white" }}
        >
          삭제!!
        </TiDeleteOutline>
      ) : (
        <TiDeleteOutline onClick={() => deleteTodo(todo.id)}>
          삭제!!
        </TiDeleteOutline>
      )}
    </Item>
  );
}
