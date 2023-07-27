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
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 80%;
  background-color: ${(props) => props.theme.pgColor};
  border: 4px solid black;
  p {
    font-weight: bold;
    font-size: 40px;
  }
`;

function App() {
  const isDarkMode = useRecoilValue(isDarkAtom);
  const setDarkMode = useSetRecoilState(isDarkAtom);

  const darkModeHandler = () => {
    setDarkMode((prev: boolean) => !prev);
  };
  console.log(isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Root>
        <Todo>
          <ToggleButton darkModeHandler={darkModeHandler} />
          <p>My Todo List</p>
          <TodoInput />
          <TodoList />
        </Todo>
      </Root>
    </ThemeProvider>
  );
}

export default App;
