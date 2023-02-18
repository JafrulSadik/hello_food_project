import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";

const AllProductsComponent = () => {
  const { products, loading } = useSelector((state) => state.product);

  return (
    <Container>
      <div className="header">
        <div className="name">
          <span className="text">All Products</span>
        </div>
        <Link className="link" to="/products/all-products">
          <div className="viewAll">
            <span className="seeAllSpan">View All</span>
          </div>
        </Link>
      </div>
      <div className="wrapper">
        {products
          .map((item) => <ProductCard item={item} key={item._id} />)
          .slice(0, 10)}
      </div>
      {loading && <Spinner />}
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

  .text {
    font-size: 30px;
    font-weight: 700;
    color: #01936c;
    /* border-bottom: 1px solid #01936c; */

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
    &:hover {
      background-color: #01936c;
      color: white;
      transition: 0.3s;
    }

    ${mobile({
      fontSize: "14px",
    })}
  }
  .link {
    text-decoration: none;
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

export default AllProductsComponent;
