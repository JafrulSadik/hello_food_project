import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { get_Totals } from "../redux/features/cart/cartSlice";

const Order = () => {
  const { cartProducts, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_Totals());
  }, [cartProducts, dispatch]);
  const productsWeight = cartProducts.reduce(
    (acc, item) => acc + item.weight * item.cartQuantity,
    0
  );

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
                    <h3>{item.price} Tk</h3>
                    <div className="cartQuantity">
                      <span>Qty : {item?.cartQuantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="deliveryInfo">
              <div className="estimatedDelivery">
                <span className="est">Estimated Delivery</span>
                <span>2-3 working days</span>
              </div>
              <div className="deliveryCost">
                <span>120 Tk</span>
              </div>
            </div>
          </div>
          <div className="midBottom">
            <h3>Shipping Address</h3>
            <form>
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Address" required />
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="Phone" required />
            </form>
          </div>
        </div>
        <div className="bottomSection">
          <div className="bottomWrapper">
            <div className="total">
              <h3>Subtotal : {cartTotalAmount}</h3>
              <small>Delivery Charge : {}</small>
              <h5 className="totalAmount">
                Total : <span>{cartTotalAmount} Tk</span>
              </h5>
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
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
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
  }
  .order_MidSection > .midBottom > h3 {
    padding: 0 10px;
    font-weight: 600;
  }
  .order_MidSection > .midBottom {
    margin: 0px 10px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px 10px 30px 10px;
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
  }
  .bottomWrapper {
    display: flex;
    margin-top: 80px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color: #fff;
    height: 40px;
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
  }
`;

export default Order;
