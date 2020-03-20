import React from 'react';
import styled from '../../Styles/typed-components';
import NavLeft from '../NavLeft';
import NavTop from '../NavTop';

interface IProps {

}
const LayoutContainer: React.FC<IProps> = ({
    children
}) => {
    const navWidth = 100;
    const navHeight = 80;
    return (
        <Container>
            <Wrapper navWidth={navWidth} navHeight={navHeight}>
                <NavLeft navWidth={navWidth} />
                <NavTop navHeight={navHeight}/>
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
`;
const Content = styled.div`
    width: 100%;
    padding: 20px;
`;

export default LayoutContainer;