import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import ProductCard from "./ProductCard";

const CategoryWiseProducts = ({ category }) => {
  const { products } = category;
  return (
    <Container>
      <div className="header">
        <div className="name">
          <span className="text">{category?.name}</span>
        </div>
        <div className="viewAll">
          <Link className="link" to={`/categories/${category?.categoryUrl}`}>
            View All
          </Link>
        </div>
      </div>
      <div className="wrapper">
        {products.map((item, index) => (
          <ProductCard item={item} key={index} />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 50px 50px;
  ${mobile({
    margin: "0px 5px",
  })}

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 10px;

    ${mobile({
      marginTop: "0px",
      margin: "20px 20px",
    })}
  }
  .header > .link {
    text-decoration: none;
  }

  .text {
    font-size: 30px;
    font-weight: 700;
    color: #01936c;

    ${mobile({
      fontSize: "20px",
    })}
  }

  .viewAll {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid #01936c;
    padding: 5px 10px;
    border-radius: 5px;
    color: #01936c;
    cursor: pointer;
    &:hover {
      background-color: #01936c;
      color: white;
      transition: 0.3s;
    }

    ${mobile({
      fontSize: "14px",
    })}
  }
  .viewAll > .link {
    text-decoration: none;
    color: inherit;
    &:hover {
      background-color: #01936c;
      color: white;
      transition: 0.3s;
    }
  }
  .wrapper {
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
`;
export default CategoryWiseProducts;
