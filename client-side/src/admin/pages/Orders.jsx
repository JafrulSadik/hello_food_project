import React from 'react';
import styled from 'styled-components';

const Orders = () => {
    return (
        <Container>
            <div className="orders">
                All Orders
            </div>
        </Container>
    );
};

const Container = styled.div`
    .orders {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export default Orders;