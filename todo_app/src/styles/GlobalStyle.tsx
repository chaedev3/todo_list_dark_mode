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
