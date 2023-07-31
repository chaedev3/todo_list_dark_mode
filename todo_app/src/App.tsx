import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import ToggleButton from "./components/ToggleButton";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/Theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./recoil/atom";

const Root = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Todo = styled.div`
  display: flex;
  box-sizing: content-box;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 80%;
  background-color: ${(props) => props.theme.pgColor};
  border: 4px solid black;
`;

const TodoItem = styled.div`
  box-sizing: content-box;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 80%;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

function App() {
  const isDarkMode = useRecoilValue(isDarkAtom);
  const setDarkMode = useSetRecoilState(isDarkAtom);

  const darkModeHandler = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Root>
        <Todo>
          <TodoItem>
            <ToggleButton darkModeHandler={darkModeHandler} />
            <Title>My Todo List</Title>
            <TodoInput />
            <TodoList />
            <hr />
          </TodoItem>
        </Todo>
      </Root>
    </ThemeProvider>
  );
}

export default App;
