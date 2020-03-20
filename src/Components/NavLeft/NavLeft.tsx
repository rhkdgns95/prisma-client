import React from 'react';
import styled from '../../Styles/typed-components';

interface IProps {
    navWidth: number;
}

const NavLeft: React.FC<IProps> = ({ navWidth }) => <Container navWidth={navWidth} />;

interface IContainer {
    navWidth: number;
}
const Container = styled.div<IContainer>`
    position: fixed;
    top: 0;
    left: 0;
    width: ${props => props.navWidth}px;
    height: 100%;
    overflow-y: auto;
    background-color: #333333;
    transition: .2s;
`;

export default NavLeft;