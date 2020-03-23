import React from 'react';
import styled from '../../Styles/typed-components';
import { useAppContext } from '../App/AppProvider';

interface IProps {
    navHeight: number;
}

const NavbarTopContainer: React.FC<IProps> = ({ navHeight }) => {

    const { navigation } = useAppContext();

    return (
        <Container navHeight={navHeight}>
            <Wrapper>
                <Text>
                    DashBoard > <strong>{ navigation?.name }</strong>
                </Text>
            </Wrapper>
        </Container>
    );
}

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