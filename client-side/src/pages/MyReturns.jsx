import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const MyReturns = () => {
  return (
    <>
      <Navbar />
      <ReturnContainer>
        <div className="header">
          <Link to="/account">
            <FontAwesomeIcon icon={faAngleLeft} className="iconLeft" />
          </Link>
          <h3>My Returns</h3>
        </div>
        <div className="mid">
            <p>There are no returns yet</p>
            <Link to='/' className="button"><span>Continue Shopping</span></Link>
        </div>
      </ReturnContainer>
    </>
  );
};

const ReturnContainer = styled.div`
    .header {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid lightgray;
}
.header h3 {
    font-weight: 500;
}
.header .iconLeft {
   font-size: 22px;
   display: flex;
   align-items: center;
   color: black;
}
.mid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    height: 70vh;
    gap: 20px;
}
.mid > p {
    color: #474444fa;
    font-size: 14px;
}
.mid > .button {
    padding: 10px 30px;
    border: none;
    color: white;
    background-color: #01936c;
    font-size: 16px;
    border-radius: 5px;
    text-decoration: none;
}
`;
export default MyReturns;
