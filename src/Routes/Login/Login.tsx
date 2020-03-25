import React from 'react';
import LoginProvider from './LoginProvider';
import styled from '../../Styles/typed-components';
import { useAppContext } from '../../Components/App/AppProvider';

const Login = () => (
    <LoginProvider>
        <LoginPresenter/>
    </LoginProvider>
);

const LoginPresenter = () => {
    
    const { toggleLoggedIn } = useAppContext();
    
    return (
        <Container>
            <Wrapper>
                <Title>Careda</Title>
                <LoginBtn onClick={toggleLoggedIn}>로그인</LoginBtn>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    min-height: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    height: 100%;
    padding-bottom: 50px;
    background-color: #f4f6f5;
`;
const Title = styled.span`
    margin-bottom: 50px;
`;
const LoginBtn = styled.button`
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 3px;
    outline: none;
    // font-size: 14px;
    border: .5px solid #dfdfdf;
    box-shadow: 0 1px 2px rgba(0,0,0,0.22);
    color: #888888;
    background-color: white;
    transition: .2s;
    &:hover {
        color: black;
        box-shadow: 0 2px 4px rgba(0,0,0,.42);
    }

`;

export default Login;