import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import  {toast, ToastContainer }  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const notify = () => {
    toast.success('Order Placed Successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored"
    })
  }
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
            <div className="order_product_info">
              <div className="orderImgDiv">
                <img
                  src="https://i.ibb.co/K6dxfyc/Himalay-pink-salt-gura.jpg"
                  alt=""
                />
              </div>
              <div className="cartInfoDiv">
                <h5>Himalayan Natural Pink Salt Rock Salt 1 kg</h5>
                <div className="priceandquantity">
                  <h3>320 Tk</h3>
                  <div className="cartQuantity">
                    <span>Qty : 1</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="deliveryInfo">
                <div className="estimatedDelivery">
                    <span className="est">Estimated Delivery</span>
                    <span>23 Oct - 26 Oct</span>
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
                    <h5 className="totalAmount">Total : <span>440 Tk</span></h5>
                </div>
                <div className="placeButton">
                    <button onClick={notify}>Place Order</button>
                </div>
            </div>
        </div>
      </OrderContainer>
      <ToastContainer />
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
    gap: 5px;
  }
  .order_product_info > .cartInfoDiv > .priceandquantity {
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
