import React from 'react';
import styled from '../../Styles/typed-components';

interface IProps {
    navHeight: number;
}

const NavbarTopContainer: React.FC<IProps> = ({ navHeight }) => <Container navHeight={navHeight} />;

interface IContainer {
    navHeight: number;
}

const Container = styled.div<IContainer>`
    width: 100%;
    height: ${props => props.navHeight}px;
    background-color: #f4f6f5;
    // background-color: red;
`;

export default NavbarTopContainer;