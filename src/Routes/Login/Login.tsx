import React from 'react';
import LoginProvider from './LoginProvider';

const Login = () => (
    <LoginProvider>
        <LoginPresenter/>
    </LoginProvider>
);

const LoginPresenter = () => (
    <>
        Hello Login
    </>
);

export default Login;
