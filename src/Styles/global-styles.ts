import { createGlobalStyle } from './typed-components';

/**
 *  GlobalStyles 
 *  
 *  - 컴포넌트에 글로벌한 스타일 적용.
 *  - DevExpress의 컴포넌트도 확인 할 것. - (예정사항)
 */
const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html, body {
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyles;