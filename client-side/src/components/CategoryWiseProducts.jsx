import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import ProductCard from "./ProductCard";

const CategoryWiseProducts = ({ category }) => {
  const { products } = category;
  const location = useLocation();

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
        {location?.pathname === "/"
          ? products
              .map((item, index) => <ProductCard item={item} key={index} />)
              .slice(0, 10)
          : products.map((item, index) => (
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 10px;

    ${mobile({
      gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
      margin: "4%",
    })}
  }
`;
export default CategoryWiseProducts;
