# TodoList 만들기(Typescript + Recoil) feat. 다크모드 

```bash
npm i 
npm start 
```



오늘은 React + Typescript + Recoil + Styled Component  을 이용해 Todo List 를 만들고 다크모드까지 적용 시켜보겠다. 



순서는 다음과 같다. 

1. 다크모드 틀 잡기 
2. Todo List 기능 구현 (할 일 추가 / 삭제 / 다했으면 체크 가능하게) 
3. css 적용 



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

components/ToggleButton.tsx 

```typescript
type props = {
  darkModeHandler: () => void;
};

export default function ToggleButton({ darkModeHandler }: props) {
  return <button onClick={darkModeHandler}>토글토글</button>;
}

```

- 이렇게 하게 되면 기본적으로 다크 모드 구현에 관한 설정은 끝났다. 나중에 css 를 건드리면서 세부적인 부분들을 만져주면 된다. 



### 2. Todo List 기능 구현 

##### 1) recoil/todo.ts 작성

```typescript
import { atom } from "recoil";

export interface TodoTypes {
  id: number;
  texts: string;
  done: boolean;
}

export const inputState = atom<string>({
  key: "inputState",
  default: "",
});

export const todoListState = atom<TodoTypes[]>({
  key: "todoLsitState",
  default: [],
});
```



-> TodoTypes 에는 id, texts (내용), done(완료 여부) 를 담는다.  



만약 새로고침하면 할 일 목록이 날아가는 것이 싫다면 recoil-persist를 추가해준다. 하지만 새로 고침하면 checkbox 의 값들이 날아가기 때문에 나는 그냥 새로고침 하면 할 일 목록이 날아가는 것으로 구현하였다. 

```typescript
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface TodoTypes {
  id: number;
  texts: string;
  done: boolean;
}

export const inputState = atom<string>({
  key: "inputState",
  default: "",
});

export const todoListState = atom<TodoTypes[]>({
  key: "todoLsitState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
```



##### 2) 컴포넌트로는 할 일 목록을 추가 할 수 있도록 하는 TodoInput.tsx, 할 일 목록들을 출력하는 TodoList.tsx, 할 일 하나하나를 출력하는 TodoItem.tsx를 만들어주겠다. 

components/TodoList.tsx 

```typescript
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
 
```

- 기징 먼저 recoil에 저장되어 있는 할 일 목록을 출력해주는 TodoList 를 작성한다. 할 일이 없다면 '오늘 할 일이 없나요?' 라는 문구를 띄워주고 있다면 하나하나를 TodoItem 으로 보여주도록 하겠다.  

components/TodoInput.tsx  

```typescript
import { useRecoilState } from "recoil";
import { TodoTypes, inputState, todoListState } from "../recoil/todo";

export default function TodoInput() { 
  // useRecoilState - 값을 가져오고 변경까지 가능  
  const [text, setText] = useRecoilState<string>(inputState);
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoListState);

  // 할 일 추가
  const addTodo = () => {
     // 내용이 없으면 추가되면 안되니까 return 
    if (!text.trim()) {
      return;
    }
    // recoil에 저장된 마지막 todo의 id 값보다 +1 해서 다음 id 값을 지정해준다. 
    const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
    // done 의 기본값은 완료되지 않았으니까 false 
    const todo: TodoTypes = {
      id: nextId,
      texts: text,
      done: false,
    };
    // 기존의 todo 에 추가해주고 inputState 는 빈 걸로 다시 바꿔준다. 
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

```

- useRecoilState를 사용하면 값도 불러올 수 있고 변경도 할 수 있다.  먼저 useRecoilState를 이용해 recoil에 저장된 todoListState 들과 inputState를 가져온다. 



components/TodoItem.tsx

```typescript
import { useRecoilState } from "recoil";
import { TodoTypes, todoListState } from "../recoil/todo";

export default function TodoItem({ todo }: { todo: TodoTypes }) {
  // todoList 를 받아옴 
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoListState);
  // checkbox를 클릭하면 done 의 상태를 바꿔줌 (done이 true 이면 끝난 거니까 끝났다고 줄을 그어줌)
  const changeDoneHandler = (id: number) => {
    setTodos(
      todos.map((todo: TodoTypes) => {
        return todo.id === id ? { ...todo, done: !todo.done } : todo;
      })
    );
  };
  // 삭제를 누르면 todo 목록에서 지움
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
```

- todo의 done의 상태를 바꿔주는 건 모든 todo 를 돌면서 같은 id를 찾아서 그 done의 값을 바꿔주는 형태로 진행하였음.
- 또한 todo 목록에서 삭제할 때에는 filter로 해당 id와 같지 않은 것들만 필터링 해줌



App.tsx 

```typescript
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
```

-> 다 했다면 App.tsx에 TodoInput 과 TodoList를 렌더링 해줌 



css 적용이 안 된 모습은 다음과 같다. 이제 css 를 입혀보자!! 

![Animation](https://github.com/chaedev3/todo_list_dark_mode/assets/109324466/f0fb3094-ef05-4096-b772-b8b046d30d95)

### 3. CSS 

Figma 로 대충 만들어봤다. 이렇게 한번 만들어보자!! 

![Desktop - 1](https://github.com/chaedev3/todo_list_dark_mode/assets/109324466/82798f4f-a8cd-433d-b364-ff6289005cac)



