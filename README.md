# TodoList 만들기(Typescript + Recoil) feat. 다크모드 



오늘은 React + Typescript + Recoil + Styled Component  을 이용해 Todo List 를 만들고 다크모드까지 적용 시켜보겠다. 



순서는 다음과 같다. 

1. 다크모드 틀 잡기 
2. Todo List 기능 구현 (할 일 추가 / 삭제 / 다했으면 체크 가능하게) 
3. css 

### 0. 기본 설정 

##### 1) (React + Typescript + Styled Component + Recoil 설치)

```bash
npx create-react-app todo_app --template typescript 
npm install --save styled-components
npm install @types/styled-components
npm install recoil 
npm install recoil-persist 
```

##### 2) index.tsx 에 RecoilRoot 추가 

```typescript
// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```





### 1. 다크모드 

앞선 포스팅에서 했던 일을 또 해주면 된다. 이해가 잘 가지 않는다면 앞 포스팅을 참고하면 될 것 같다. 

https://velog.io/@chaedev3/React-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0 

##### 1) styles/styled.d.ts 에 DefaultTheme에 대한 Type 지정 

```typescript
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    borderColor: string;
  }
}
```

##### 2) styles/Theme.ts 에 라이트모드와 다크모드에 적용할 Theme 정의해줌 

```typescript
import { DefaultTheme } from "styled-components/dist/types";

export const lightTheme: DefaultTheme = {
  bgColor: "#ffffff",
  textColor: "#000000",
  borderColor: "#1e1e1e",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#2F2F2F",
  textColor: "#e5e5e5",
  borderColor: "#ffffff",
};
```

##### 3) styles/GlobalStyle.tsx 에 Global Style 지정 (createGlobalStyle)

```typescript
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        padding: 0; 
        margin: 0;    
        background-color: ${(props) => props.theme.bgColor};
    }
    p{
        color: ${(props) => props.theme.textColor}
    }
`;

export default GlobalStyle;
```

##### 4) recoil/atom.ts 

```typescript
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
```

##### 5) App.tsx 에 ThemeProvider 적용 및 recoil를 활용해 저장해줌

```typescript
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
      </Root>
    </ThemeProvider>
  );
}

export default App;
```



- 이렇게 하게 되면 기본적으로 다크 모드 구현에 관한 설정은 끝났다. 나중에 css 를 건드리면서 세부적인 부분들을 만져주면 된다. 



### 2. Todo List 기능 구현 



### 3. CSS 