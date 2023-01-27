import React from "react";
import styled from "styled-components";
import {MdOutlineProductionQuantityLimits, MdOutlineEditCalendar} from 'react-icons/md'
import { AiFillDollarCircle, AiOutlineUser} from 'react-icons/ai'
import {TbCurrencyTaka, TbTruckDelivery} from 'react-icons/tb'
import {BiCategory} from 'react-icons/bi'
import {BsCartX} from 'react-icons/bs'

const Summary = () => {
  return (
    <Container>
      <h3 className="header">Inventory Stats</h3>
      <div className="info-box-div">
        <InfoBox color="#b624ff">
          <div className="icon-div">
            <MdOutlineProductionQuantityLimits />
          </div>
          <div className="text-div">
            Total Products <span>200</span>
          </div>
        </InfoBox>
        <InfoBox color="#32963d">
        <div className="icon-div">
          <AiFillDollarCircle />
        </div>
          <div className="text-div">
            Total Stock Value <span>1,20,000</span>
          </div>
        </InfoBox>
        <InfoBox color="#689F38">
        <div className="icon-div">
          <MdOutlineEditCalendar />
        </div>
          <div className="text-div">
            Total Orders <span>100</span>
          </div>
        </InfoBox>
        <InfoBox color="#03a5fc">
        <div className="icon-div">
          <AiOutlineUser />
        </div>
          <div className="text-div">
            Total Users <span>20</span>
          </div>
        </InfoBox>
        <InfoBox color="#6ab04c">
        <div className="icon-div">
          <TbCurrencyTaka />
        </div>
          <div className="text-div">
          Current Month Sell Value<span>20,000</span>
          </div>
        </InfoBox>
        <InfoBox color="#576574">
          <div className="icon-div">
            <TbTruckDelivery />
          </div>
          <div className="text-div">
          Current Month Delivered Products<span>5</span>
          </div>
        </InfoBox>
        <InfoBox color="#c41849">
          <div className="icon-div">
            <BsCartX />
          </div>
          <div className="text-div">
          Out of Stock<span>10</span>
          </div>
        </InfoBox>
        <InfoBox color="#01a3a4">
          <div className="icon-div">
            <BiCategory />
          </div>
          <div className="text-div">
          Categories<span>4</span>
          </div>
        </InfoBox>
      </div>
    </Container>
  );
};

const Container = styled.div`
    h3 {
    display: table;
    margin: 0 auto;
    border-bottom: 2px solid green;
    font-size: 22px;
  }
  .info-box-div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 20px 0;
    margin: 15px 5px;
  }

`;

const InfoBox = styled.div`
    background-color: ${(props) => props.color || 'green'};
    height: 120px;
    width: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* gap: 5px; */
    color: white;
    .icon-div {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      /* padding: 5px; */
      padding-left: 12px;
      font-size: 40px;
    }
    .text-div {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-right: 15px;
      font-size: 16px;
    }
    
`

export default Summary;
