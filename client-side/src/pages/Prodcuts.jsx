import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { AllProductItems } from "../data";
import { mobile } from "../responsive";

const Prodcuts = () => {
  return (
    <div style={{backgroundColor: '#fcf8f8'}}>
      <Navbar />
      <Categories />
      <Container>
        <div className="wrapper">
          <div className="header">
            <div className="name">
              <span>All Products</span>
            </div>
            <div className="sort">
              <span>Sort By : </span>
              <select>
                <option value="">Newly Added</option>
                <option value="">A-Z</option>
                <option value="">Z-A</option>
              </select>
            </div>
          </div>
          <div className="productsList">
            {AllProductItems.map((item) => {
              return <ProductCard item={item} key={item.id} />;
            })}
          </div>
          <div className="pagination">
            <ul>
              <li>
                <a href="/">
                  <AiOutlineLeft />
                </a>
              </li>
              <li>
                <a href="/">1</a>
              </li>
              <li>
                <a href="/">2</a>
              </li>
              <li>
                <a href="/">3</a>
              </li>
              <li>
                <a href="/">4</a>
              </li>
              <li>
                <a href="/">5</a>
              </li>
              <li>
                <a href="/">6</a>
              </li>
              <li>
                <a href="/">7</a>
              </li>
              <li>
                <a href="/">
                  <AiOutlineRight />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
      <MobileMenu />
    </div>
  );
};

const Container = styled.div`
    .wrapper {
        margin: 50px 50px;
        ${mobile({
            margin: 0
        })}
    }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 50px;
    padding: 20px;
    /* border-bottom: 1px solid lightgray; */
    ${mobile({
      margin: "10px 10px",
      padding: "6px",
    })}
  }
  .name > span {
    font-size: 16px;
    font-weight: 600;
    border-bottom: 2px solid green;
    ${mobile({
        fontSize: '13px'
    })}
  }
  .sort > span {
    font-size: 14px;
    margin-right: 6px;
  }
  .sort select {
    font-size: 14px;
    padding: 5px;
    cursor: pointer;
    ${mobile({
        fontSize: '10px',
        padding: '3px'
    })}
  }
  .productsList {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 5px;

    ${mobile({
      justifyContent: "space-evenly",
      gap: "15px 0px",
    })}
  }
  .pagination ul {
    display: flex;
    list-style: none;
    justify-content: flex-end;
    margin: 40px;
    gap: 15px;
    ${mobile({
        margin: '20px 10px',
        gap: '5px'
    })}
  }
  .pagination li {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid lightgray;
    padding: 5px;
    &:hover {
        border: 1px solid blue;
    }
  }
  .pagination a {
    text-decoration: none;
    color: black;
  }
`;
export default Prodcuts;
