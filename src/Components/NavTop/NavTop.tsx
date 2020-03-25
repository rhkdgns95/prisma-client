import React from 'react';
import styled from '../../Styles/typed-components';
import { Button } from "devextreme-react";

interface IProps {
    isHiddenNav: boolean;
    navHeight: number;
    navigation: ILink | null;
    toggleIsHiddenNav: () => void;
    loggedOut: () => any;
}

const NavbarTopContainer: React.FC<IProps> = ({ 
    isHiddenNav,
    navHeight,
    navigation,
    toggleIsHiddenNav,
    loggedOut
}) => (
    <Container navHeight={navHeight}>
        <Wrapper className={"dx-field"}>
            <Text>
                <Button 
                    icon="back"
                    onClick={toggleIsHiddenNav} 
                    style={{
                        transform: isHiddenNav ? "rotateY(-180deg)" : "",
                        marginRight: 10,
                        transition: ".2s"
                    }}    
                />
                DashBoard > <strong>{ navigation?.name }</strong>
               
            </Text>
            <LogoutBtn onClick={loggedOut}>로그아웃</LogoutBtn>
        </Wrapper>
    </Container>
);

interface IContainer {
    navHeight: number;
}

const Container = styled.div<IContainer>`
    width: 100%;
    display: flex;
    align-items: center;
    height: ${props => props.navHeight}px;
    background-color: ${props => props.theme.navTopColor};
    box-shadow: 0 1px 2px 1px rgba(0,0,0,.22);
    border-bottom: 2px solid #a0a0a0;
`;
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 20px;
`;
const Text = styled.div`
    color: #737373;
    font-size: 14px;
`;
const LogoutBtn = styled.button`
    margin-left: auto;
    background-color: white;
    color: #191919;
    border: 0;
    padding: 4px 10px;
    font-size: 12px;
    border: 1px solid #8a8a8a;
    transition: .2s;
    cursor: pointer;
    &:hover {
        box-shadow: 0 2px 2px rgba(0,0,0,.32);
    }
`;
export default NavbarTopContainer;