import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const ProductCard = (props) => {
  const { item } = props;
  return (
    <Container>
      <Link className="link" to={`/product/${item.id}`}>
        <CardWrapper key={item.id}>
          <div className="new">
            <p>New</p>
          </div>
          <div className="imageDiv">
            <img src={item.img} alt="" />
          </div>
          <div className="textDiv">
            <span className="title">{item.title}</span>
          </div>
          <div className="priceAndButton">
            <span>{item.price} Tk</span>
            <button>
              <FaShoppingCart /> Add
            </button>
          </div>
        </CardWrapper>
      </Link>
    </Container>
  );
};
const Container = styled.div`
  .link {
    text-decoration: none;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #3bb77d31;
  height: 340px;
  width: 220px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 13px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 15px #33333316;
    border: 1px solid #3bb77d57;
    transition: 0.3s;
  }

  ${mobile({
    height: "248px",
    width: "160px",
    borderRadius: "5px",
    marginBottom: "0",
  })}

  .new {
    position: absolute;
    left: 10px;
    top: 8px;
    background-color: #3bb77e;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 14px;
    color: white;
    font-size: 12px;

    ${mobile({
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "10px",
      color: "white",
    })}
  }

  .title {
    font-size: 14px;
    font-weight: bold;
    color: #253d4e;

    ${mobile({
      fontSize: "11px",
      fontWeight: 600,
    })}
  }

  .imageDiv {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 0 0;
    /* border: 1px solid red; */
  }

  .imageDiv > img {
    /* border: 1px solid green; */
    height: 160px;
    width: 160px;

    &:hover {
      height: 162px;
      width: 162px;
      transition: 1s;

      ${mobile({
        height: "122px",
        width: "132px",
        transition: "0.3s",
      })}
    }

    ${mobile({
      height: "120px",
      width: "130px",
    })}
  }

  .textDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    /* border: 1px solid blue; */
    ${mobile({
      margin: "10px 10px 0 10px",
    })}
  }

  .priceAndButton {
    display: flex;
    width: 100%;
    margin: 20px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    ${mobile({
      margin: "10px",
    })}
  }

  .priceAndButton span {
    font-size: 14px;
    font-weight: bold;
    color: #3bb77e;
    ${mobile({
      fontSize: "11px",
    })}
  }

  .priceAndButton button {
    display: flex;
    align-items: center;
    gap: 5px;
    border: none;
    font-size: 14px;
    font-weight: bold;
    padding: 8px 14px;
    color: #3bb77e;
    background-color: #a1f6ce6c;
    border-radius: 5px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: #3bb77e;
      color: white;
    }

    ${mobile({
      fontSize: "11px",
    })}
  }
`;

export default ProductCard;
