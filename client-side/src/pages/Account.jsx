import React from "react";
import { AiOutlineRollback, AiOutlineShopping } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { HiOutlineNewspaper } from "react-icons/hi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AccountHeader from "../components/AccountHeader";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import { desktop } from "../responsive";

const Account = () => {
  return (
    <>
      <Navbar />
      <AccountContainer>
        <AccountHeader />
        <section className="midContainer">
          <ul>
            <li>
              <AiOutlineShopping className="accountIcon" />
              <Link to='/my-orders' className="link">My Orders</Link>
            </li>
            <li>
              <AiOutlineRollback className="accountIcon" />
              <Link to='/my-returns' className="link">My Returns</Link>
            </li>
            <li>
              <MdOutlineManageAccounts className="accountIcon" />
              <Link className="link">Manage Profile</Link>
            </li>
            <li>
              <HiOutlineNewspaper className="accountIcon" />
              <Link to='/privacy-policy' className="link">Policies</Link>
            </li>
            <li>
              <FiHelpCircle className="accountIcon" />
              <a href="tel:01611456116" className="link">Help</a>
            </li>
            <li>
              <RiLogoutBoxLine className="accountIcon" />
              <Link className="link">Log out</Link>
            </li>
          </ul>
        </section>
      </AccountContainer>
      <MobileMenu />
    </>
  );
};

const AccountContainer = styled.div`
  .midContainer > ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
    ${desktop({
      width : '60%',
      margin : '0 auto'
    })}
  }
  .midContainer > ul > li {
    padding: 0 0 0 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid lightgray;
  }
  .midContainer .accountIcon {
    font-size: 24px;
    color: #474444fa;
  }
  .link {
    text-decoration: none;
    color: #474444fa;
    width: 100%;
    padding: 5px 0;
    height: 100%;
    padding: 12px 12px;
  }
`;
export default Account;
