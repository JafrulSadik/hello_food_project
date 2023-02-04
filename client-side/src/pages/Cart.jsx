import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const { products } = useSelector((state) => state.cart);
  const [subtotalPrice, setSubTotalPrice] = useState(0);
  //   const [totalPrice, setTotalPrice] = useState(0);

  const handleCartQuantity = (e) => {
    console.log("clicked");
    console.log(e?.target);
    if (e?.target?.name === "minus") {
      console.log("clicked");
    }
  };

  const handleCheckbox = (product) => {
    const singleTotal =
      (product?.discount ? product?.discount : product?.price) * quantity;
    setSubTotalPrice(singleTotal);
  };

  return (
    <>
      <Navbar />
      <CartContainer>
        <div className="header">
          <Link to="/">
            <FontAwesomeIcon icon={faAngleLeft} className="iconLeft" />
          </Link>
          <h3>My Cart</h3>
        </div>
        {products?.map((product) => (
          <div className="mid">
            <div className="check">
              <input
                type="checkbox"
                onChange={() => handleCheckbox(product)}
                name=""
              />
            </div>
            <div className="cartImgDiv">
              <img src={product?.img?.url} alt="product-img" />
            </div>
            <div className="cartInfoDiv">
              <h5>{product?.name}</h5>
              <div className="priceandquantity">
                <h3>
                  {product?.discount ? product?.discount : product?.price} Tk
                </h3>
                <div className="cartQuantity">
                  <FaShoppingCart
                    className="iconMinus"
                    name="minus"
                    value={product?._id}
                    onClick={(e) => handleCartQuantity(e)}
                  />
                  <input
                    type="text"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={product?.cartQuantity}
                  />
                  <button
                    className="iconPlus"
                    name="plus"
                    onClick={(e) => handleCartQuantity(e)}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="bottom">
          <div className="checkAll">
            <input type="checkbox" name="" />
            <span>All</span>
          </div>
          <div className="checkOut">
            <div className="shippingAndTotal">
              <h4>
                Total : <span className="priceTotal">{subtotalPrice}</span>
              </h4>
            </div>
            <Link to="/order" className="link">
              <span className="buttonCheckOut">Check Out</span>
            </Link>
          </div>
        </div>
      </CartContainer>
    </>
  );
};

const CartContainer = styled.div`
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
    align-items: center;
    gap: 10px;
    margin: 10px;
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
  }
  .mid > .check {
  }

  .mid > .cartImgDiv {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mid > .cartImgDiv > img {
    height: 100px;
    width: 100px;
  }
  .mid > .cartInfoDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
  }
  .mid > .cartInfoDiv > .priceandquantity {
    display: flex;
    justify-content: space-between;
  }
  .cartInfoDiv > .priceandquantity > h3 {
    color: red;
  }
  .cartInfoDiv > .priceandquantity > .cartQuantity {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0 10px;
  }
  .priceandquantity > .cartQuantity > .iconMinus {
    border: none;
    background-color: inherit;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .priceandquantity > .cartQuantity > .iconPlus {
    border: none;
    background-color: inherit;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .priceandquantity > .cartQuantity > input {
    width: 20px;
    text-align: center;
    border: 1px solid lightgray;
    padding: 3px;
    background-color: lightgray;
    outline: none;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .bottom .checkAll {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .bottom > .checkOut {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .checkOut > .shippingAndTotal {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .checkOut > .link {
    text-decoration: none;
    color: white;
  }
  .buttonCheckOut {
    padding: 8px 10px;
    background-color: #3bb54a;
    border-radius: 5px;
  }
`;

export default Cart;
