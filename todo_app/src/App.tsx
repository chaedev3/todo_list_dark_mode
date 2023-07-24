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
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
        <ToggleButton darkModeHandler={darkModeHandler} />
        <TodoInput />
        <TodoList />
      </Root>
    </ThemeProvider>
  );
}

export default App;
