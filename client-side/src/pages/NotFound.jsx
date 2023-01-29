import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <Container>
            <h4>Page not Found</h4>
        </Container>
    );
};

const Container = styled.div`
    color: red;
    text-align: center;
    margin: 20px;
`

export default NotFound;