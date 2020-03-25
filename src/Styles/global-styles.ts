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
        height: 100%;
    }
    ul, li, a {
        padding: 0;
        margin: 0;
        list-style: inherit;
        text-decoration: inherit;
        color: inherit;
    }
    #root {
        height: 100%;
        background-color: ${props => props.theme.bgColor};
    }
    .api-container {
        width: 100%;
    }
    .api-wrapper {
        background-color: white;
        padding: 40px 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,.22);
        border: 3px;
    }

    #form_payment {
        background-color: #dfdfdf;
        .dx-datagrid-header-panel {
            border: 0;
        }
        .dx-datagrid-rowsview {
            height: 0;
        }
    }
`;

export default GlobalStyles;