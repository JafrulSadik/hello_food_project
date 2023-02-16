import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";

const OrderSuccess = () => {
  const { orderId } = useSelector((state) => state.order);
  return (
    <>
      <Navbar />
      <Container>
        <div className="success">
          <p>Your Order is Placed Successfully</p>
          <p>
            Order Number : <span style={{ color: "green" }}>{orderId}</span>
          </p>
          <Link to="/" className="name-link">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Container>
      <MobileMenu />
    </>
  );
};

export const Container = styled.div`
  .success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
  }

  .name-link {
    text-decoration: none;
    color: inherit;
  }
`;

export default OrderSuccess;
