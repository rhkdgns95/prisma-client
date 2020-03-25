import React from 'react';
import styled from '../../Styles/typed-components';

interface IProps {
    name: string;
}

const Title: React.FC<IProps> = ({
    name
}) => (
    <Container>
        <RowTitle>{ name }</RowTitle>
    </Container>

);
const Container = styled.div`

`;

const RowTitle = styled.h1`
    margin: 0;
    color: #6a6973;
    font-size: 16px;
    padding: 25px 0;
`;

export default Title;