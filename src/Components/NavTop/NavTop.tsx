import React from 'react';
import styled from '../../Styles/typed-components';
import { Button } from "devextreme-react";

interface IProps {
    isHiddenNav: boolean;
    navHeight: number;
    navigation: ILink | null;
    toggleIsHiddenNav: () => void;
}

const NavbarTopContainer: React.FC<IProps> = ({ 
    isHiddenNav,
    navHeight,
    navigation,
    toggleIsHiddenNav,
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
`;
const Wrapper = styled.div`
    padding: 20px;
`;
const Text = styled.span`
    color: #737373;
    font-size: 14px;
`;
export default NavbarTopContainer;