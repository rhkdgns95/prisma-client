import React from 'react';
import styled from '../../Styles/typed-components';
import NavLeft from '../NavLeft';
import NavTop from '../NavTop';
import { useAppContext } from '../App/AppProvider';

interface IProps {

}
const LayoutContainer: React.FC<IProps> = ({
    children
}) => {
    const { isHiddenNav, navigation, toggleIsHiddenNav, toggleLoggedIn } = useAppContext();
    const navWidth = 150;
    const navHeight = 80;

    return (
        <Container>
            <Wrapper className={isHiddenNav ? "active" : ""} navWidth={navWidth} navHeight={navHeight}>
                <NavLeft navigation={navigation} isHiddenNav={isHiddenNav} navWidth={navWidth} />
                <NavTop navigation={navigation} isHiddenNav={isHiddenNav} toggleIsHiddenNav={toggleIsHiddenNav} navHeight={navHeight} loggedOut={toggleLoggedIn}/>
                <Content>
                { 
                    children
                }    
                </Content>
            </Wrapper>
        </Container>      
    );
}

const Container = styled.div`
    width: 100%;
`;

interface IWrapper {
    navWidth: number;
    navHeight: number;
}

const Wrapper = styled.div<IWrapper>`
    // display: flex;
    width: 100%;
    padding-left: ${props => props.navWidth}px;
    transition: .2s;
    &.active {
        padding-left: 0;
    }
`;
const Content = styled.div`
    width: 100%;
    padding: 20px;
`;

export default LayoutContainer;