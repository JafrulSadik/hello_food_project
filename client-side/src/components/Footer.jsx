import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import styled from "styled-components";
import logo from "../images/hello_food.png";
import { mobile } from "../responsive";

const Footer = () => {
  return (
    <Container>
      <div className="wrapper">
        <div className="logoSec">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="followUs">
            <h4>
              <span>Follow Us</span>
            </h4>
            <div className="icons">
              <a href="/">
                <FontAwesomeIcon className="facebook" icon={faFacebookF} />
              </a>
              <a href="/">
                <AiOutlineYoutube className="youtube" />
              </a>
            </div>
          </div>
        </div>
        <div className="company">
          <h3>
            <span>Company</span>
          </h3>
          <ul>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Terms & Condition</a>
            </li>
          </ul>
        </div>
        <div className="addressSec">
          <h3>
            <span>Contact Us</span>
          </h3>
          <ul>
            <li>Address : Holding-08, East Tejturi Bazar, Tejgaon, Dhaka</li>
            <li>Email Us : hellofood02@gmail.com</li>
            <li>Hotline No : 8801611456116</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #0d0d0d;
  color: white;
  ${mobile({
    marginTop: '20px'
  })}
  .wrapper {
    display: flex;
    flex-direction: row;
    padding: 30px;
    justify-content: space-between;
    ${mobile({
      'flex-direction': 'column',
      'padding-bottom': '80px',
      'justify-content': 'center'
    })}
  }
  .logoSec {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 25px;
    flex: 1;
    ${mobile({
      'align-items': 'center'
    })}
  }
  .logo {
    height: 100%;
    width: 100%;
    ${mobile({
      'text-align': 'center'
    })}
  }
  .logo img {
    height: 60px;
    width: 100px;
  }
  .followUs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    ${mobile({
      'align-items':'center'
    })}
  }
  .followUs h4 {
    font-size: 16px;
  }
  .followUs h4 span {
    border-bottom: 2px solid green;
  }
  .icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
  .icons a {
    text-decoration: none;
    position: relative;
    top: 0;
    &:hover {
      top: -2px;
      transition: .3s;
    }
  }
  .icons .facebook {
    border-radius: 50%;
    background-color: #3B5998;
    color: white;
    padding: 6px 9px;
    cursor: pointer;
  }
  .icons .youtube {
    border-radius: 50%;
    background-color: #FF0000;
    color: white;
    padding: 6px 6px;
    cursor: pointer;
  }
  .company {
    flex: 1;
    ${mobile({
      'text-align': 'center'
    })}
  }
  .company h3 {
    font-size: 20px;
    margin-bottom: 15px;
    margin-top: 20px;
  }
  .company h3 span {
    border-bottom: 2px solid green;
  }
  .company ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .company a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
  .addressSec {
    flex: 1;
    ${mobile({
      'text-align': 'center'
    })}
  }
  .addressSec h3 {
    font-size: 20px;
    margin-bottom: 15px;
    margin-top: 20px;
  }
  .addressSec h3 span {
    border-bottom: 2px solid green;
  }
  .addressSec ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export default Footer;