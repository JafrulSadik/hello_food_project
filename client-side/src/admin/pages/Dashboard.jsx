import React from 'react';
import styled from 'styled-components';
import AdminHeader from '../components/AdminHeader';
import RecentOrders from '../components/RecentOrders';
import Summary from '../components/Summary';

const Dashboard = () => {
    return (
        <>
            <AdminHeader />
           <Container>
              <Summary /> 
              <RecentOrders />
           </Container>
        </>
    );
};

const Container = styled.div`
    margin: 10px;
    .home {
        display: flex;
        justify-content: center;
        align-items: center;
    }

`

export default Dashboard;