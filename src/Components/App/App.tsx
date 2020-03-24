import React from 'react';
import AppProvider, { useAppContext } from './AppProvider';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Payment from '../../Routes/Payment';
import Login from '../../Routes/Login';
import Home from '../../Routes/Home';
import Layout from '../Layout';

const App: any = () => {
    return (
        <AppProvider>
            <AppPresenter />
        </AppProvider>
    );
}

const AppPresenter = () => {
    const { loggedIn } = useAppContext();
    return (
        <BrowserRouter>
            {
                loggedIn ? <Layout><UserLoggedIn /></Layout> : <UserLoggedOut/>
            }
        </BrowserRouter>
    )
}

const UserLoggedIn = () => (
    <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/paid"} component={Payment} />
        <Redirect from={"*"} to={"/"}/>
    </Switch>
)
const UserLoggedOut = () => (
    <Switch>
        <Route path={"/"} exact component={Login}/>
        <Redirect from={"*"} to={"/"}/>
    </Switch>
);

export default App;