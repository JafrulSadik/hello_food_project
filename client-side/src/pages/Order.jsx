import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { get_Totals } from "../redux/features/cart/cartSlice";
import { mobile } from "../responsive";

const Order = () => {
  const { cartProducts, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_Totals());
  }, [cartProducts, dispatch]);
  // const productsWeight = cartProducts.reduce(
  //   (acc, item) => acc + item.weight * item.cartQuantity,
  //   0
  // );
  const deliveryCharge = 120;

  return (
    <>
      <Navbar />
      <OrderContainer>
        <div className="header">
          <Link className="link" to="/">
            <FontAwesomeIcon icon={faAngleLeft} className="iconLeft" />
          </Link>
          <h3>Check out</h3>
        </div>
        <div className="order_MidSection">
          <div className="midTop">
            {cartProducts?.map((item) => (
              <div className="order_product_info">
                <div className="orderImgDiv">
                  <img src={item?.img?.url} alt="" />
                </div>
                <div className="cartInfoDiv">
                  <h5>{item?.name}</h5>
                  <div className="priceandquantity">
                    <h3>{item?.discount ? item?.discount : item?.price} Tk</h3>
                    <div className="cartQuantity">
                      <span>Qty : {item?.cartQuantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="midBottom">
            <h3>Shipping Address</h3>
            <form>
              <TextField
                variant="filled"
                type="text"
                label="First Name"
                required
              />
              <TextField
                variant="filled"
                type="text"
                label="Last Name"
                required
              />
              <TextField variant="filled" type="email" label="Email" required />
              <TextField
                variant="filled"
                type="number"
                label="Phone"
                required
              />

              <TextField
                select
                helperText="Please select your city"
                defaultValue="Select"
                variant="filled"
                label="City"
                required
              />
              <TextField
                select
                helperText="Please select your area"
                defaultValue="Select"
                variant="filled"
                label="Area"
                required
              />

              <TextField
                multiline
                variant="filled"
                rows={4}
                type="text"
                label="Address"
                required
              />
            </form>
          </div>
        </div>
        <div className="bottomSection">
          <div className="total-div">
            <div className="subtotal">
              <h4>Subtotal : </h4>
              <span style={{ fontWeight: "bold" }}>{cartTotalAmount} TK</span>
            </div>
            <div className="delivery-charge">
              <small style={{ fontWeight: "bold" }}>Delivery Charge : </small>
              <small style={{ fontWeight: "bold" }}>{deliveryCharge} TK</small>
            </div>
            <div className="total">
              <h2 className="totalAmount">Total :</h2>
              <p style={{ fontWeight: "bold" }}>
                {cartTotalAmount + deliveryCharge} Tk
              </p>
            </div>
            <div className="placeButton">
              <button>Place Order</button>
            </div>
          </div>
        </div>
      </OrderContainer>
    </>
  );
};

const OrderContainer = styled.div`
  background-color: #eff0f5;
  padding-bottom: 100px;
  .header {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid lightgray;
    background-color: #fff;
  }
  .header > .link {
    color: black;
  }
  .header h3 {
    font-weight: 500;
  }
  .header .iconLeft {
    font-size: 22px;
    display: flex;
    align-items: center;
  }
  .order_MidSection > .midTop {
    width: 70%;
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    ${mobile({
      width: "90%",
      padding: "10px",
    })}
  }
  .order_product_info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px;
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
  }

  .order_product_info > .orderImgDiv {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .order_product_info > .orderImgDiv > img {
    height: 100px;
    width: 100px;
    padding: 10px;
  }
  .order_product_info > .cartInfoDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
  .order_product_info > .cartInfoDiv > .priceandquantity {
    display: flex;
    justify-content: space-between;
    margin-right: 5px;
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
  .deliveryInfo {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .deliveryInfo > .estimatedDelivery {
    display: flex;
    flex-direction: column;
  }
  .deliveryInfo > .estimatedDelivery > .est {
    color: #1686c7;
  }
  .order_MidSection {
    margin-bottom: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .order_MidSection > .midBottom {
    width: 70%;
    margin: 0px 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 10px;
    ${mobile({
      width: "90%",
      padding: "10px",
    })}
  }
  .order_MidSection > .midBottom > h3 {
    padding: 0 10px;
    font-size: 22px;
    font-weight: 600;
  }
  .order_MidSection > .midBottom > form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 10px;
  }
  .order_MidSection > .midBottom > form > input {
    font-size: 16px;
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid gray;
    &:focus {
      outline: 1px solid cyan;
    }
  }
  .bottomSection {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: fixed;
    bottom: -10px;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .total-div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 70%;
    ${mobile({
      width: "85%",
    })}
  }
  .total-div > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .totalAmount {
    font-size: 16px;
  }
  .totalAmount > span {
    color: #3bb54a;
    font-size: 18px;
  }
  .placeButton > button {
    padding: 9px 16px;
    border-radius: 5px;
    background-color: #3bb54a;
    color: white;
    border: none;
    width: 100%;
    cursor: pointer;
  }
`;

export default Order;
