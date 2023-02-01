import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import profileIcon from "../images/blank-profile-picture-973460_640-removebg-preview.png";
import { desktop } from "../responsive";

const AccountHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <AHContainer>
      <section className="topContainer">
        <div className="imgDiv">
          <img src={profileIcon} alt="" />
        </div>
        <div className="textDiv">
          <h3>{userInfo?.name}</h3>
          <p>{userInfo?.email}</p>
        </div>
      </section>
    </AHContainer>
  );
};

const AHContainer = styled.div`
  .topContainer {
    width: 100%;
    background-color: #3bb54a;
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    ${desktop({
      width: "60%",
      margin: "0 auto",
    })}
  }
  .topContainer > .imgDiv {
    background-color: #d7d7d7;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .topContainer > .imgDiv > img {
    width: 80%;
    height: 70%;
  }
  .topContainer > .textDiv {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #f0ecec;
  }
  .topContainer > .textDiv > p {
    font-size: 18px;
  }
`;

export default AccountHeader;
