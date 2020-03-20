import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import * as serviceWorker from './serviceWorker';
import client from './apollo';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Styles/global-styles';
import { theme } from './Styles/theme';
import App from './Components/App';

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
        </ThemeProvider>
    </ApolloProvider>
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
