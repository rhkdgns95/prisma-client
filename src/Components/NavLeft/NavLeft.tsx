import React from 'react';
import styled from '../../Styles/typed-components';
import { Link } from 'react-router-dom';
import navigations from '../../navigations';

interface IProps {
    isHiddenNav: boolean;
    navWidth: number;
    navigation: ILink | null;
}

const NavLeft: React.FC<IProps> = ({ 
    isHiddenNav,
    navWidth,
    navigation,
 }) =>(
    <Container navWidth={navWidth} className={isHiddenNav ? "active" : ""}>
        <Wrapper>
            {
                navigation && 
                navigations.map((item, key) => 
                    <LinkItem key={key} className={item.id === navigation.id ? "active" : ""}>
                        <Link to={item.path}>{ item.name }</Link>
                    </LinkItem>
                )  
            }   
        </Wrapper>
    </Container>    
 );

interface IContainer {
    navWidth: number;
}
const Container = styled.div<IContainer>`
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: ${props => props.navWidth}px;
    height: 100%;
    overflow-y: auto;
    background-color: ${props => props.theme.navLeftColor};
    opacity: 1;
    transition: .2s;
    &.active {
        margin-left: -${props => props.navWidth}px;
        opacity: .5;
    }
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding-top: 50px;
`;
const LinkItem = styled.div`
    position: relative;
    width: 100%;
    text-align: center;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
        background-color: #438eff;
        width: 0;
    }
    & > a {
        position: relative;
        width: 100%;
        display: block;
        padding: 10px;
        color: white;
        font-size: 15px;
    }
    &:hover {
        color: #a4ddff;
        &:not(.active) > a {
            // color: #9bc3ff;
            background-color: #37364e;
            transition: .2s;
        }
    }
    
    &.active {
        background-color: #4a4a4a;
        &::before {
            width: 100%;
            transition: .3s ease-in-out;
        }
        & > a {
            background-color: #5f57dc;
            transition: .3s ease-in-out;
        }
    }
`;

export default NavLeft;