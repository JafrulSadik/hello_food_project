import { Button } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import {
  getOrderProducts,
  updateOrder,
} from "../../redux/features/order/orderSlice";
import AdminHeader from "../components/AdminHeader";

const UpdateOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderProducts, loading } = useSelector((state) => state.order);
  const navigate = useNavigate();

  const orderProduct = orderProducts.filter((item) => item._id === orderId)[0];
  const [status, setStatus] = useState(orderProduct?.deliveryStatus);

  const subtotal = orderProduct?.products?.reduce((acc, item) => {
    const price = item?.product?.discount
      ? item?.product?.discount
      : item?.product?.price;
    return acc + price * item?.cartQuantity;
  }, 0);

  const orderDate = moment(orderProduct?.createdAt).format("LLL");

  useEffect(() => {
    dispatch(getOrderProducts());
    // eslint-disable-next-line
  }, []);

  const handleUpdate = () => {
    dispatch(
      updateOrder({ orderId: orderId, deliveryStatus: status, navigate })
    );
  };

  return (
    <>
      <AdminHeader />
      <Container>
        <div className="heading">
          <h3>Update Order</h3>
        </div>
        <div className="main-box">
          <div className="box1">
            <div className="order-no">
              <p>Order #{orderProduct?._id}</p>
              <p>
                <small>Placed on {orderDate}</small>
              </p>
            </div>
            <div className="total">
              <h5>Total : {orderProduct?.totalPrice} Tk</h5>
            </div>
          </div>
          <div className="box2">
            {orderProduct?.products?.map((item) => {
              return (
                <div className="row" key={item?.product?._id}>
                  <div className="img-name">
                    <img src={item?.product?.img?.url} alt="" />
                    <p>{item?.product?.name}</p>
                  </div>
                  <div className="price">
                    {item?.product?.discount
                      ? item?.product?.discount
                      : item?.product?.price}{" "}
                    Tk
                  </div>
                  <div className="quantity">Qty : {item?.cartQuantity}</div>
                </div>
              );
            })}
          </div>
          <div className="box3">
            <div className="sub-box">
              <div className="address">
                <h3>Shipping Address</h3>
                <p>Name : {orderProduct?.name}</p>
                <p>Email : {orderProduct?.email}</p>
                <p>Phone : {orderProduct?.phone}</p>
                <p>
                  Address : {orderProduct?.address?.division},{" "}
                  {orderProduct?.address?.district},{" "}
                  {orderProduct?.address?.area}
                </p>
                <p>Detail Address : {orderProduct?.address?.detailAddress}</p>
                <span>Delivery Status :</span>
                <select
                  name="deliveryStatus"
                  defaultValue={orderProduct?.deliveryStatus}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option key={"Processing"} value={"Processing"}>
                    Processing
                  </option>
                  <option key={"Shipped"} value={"Shipped"}>
                    Shipped
                  </option>
                  <option key={"Delivered"} value={"Delivered"}>
                    Delivered
                  </option>
                  <option key={"Canceled"} value={"Canceled"}>
                    Cancelled
                  </option>
                </select>
              </div>
              <div className="total-summary">
                <h3>Total Summary</h3>
                <div className="subtotal">
                  <p>Subtotal</p>
                  <p>{subtotal} TK</p>
                </div>
                <div className="delivery">
                  <p>Delivery Fee</p>
                  <p>{orderProduct?.deliveryCharge} TK</p>
                </div>
                <hr />
                <div className="total">
                  <p>Total</p>
                  <p>{orderProduct?.totalPrice} TK</p>
                </div>
                <div className="payment-method">
                  <p>Payment Method</p>
                  <p style={{ color: "red" }}>{orderProduct?.paymentMethod}</p>
                </div>
              </div>
            </div>
            <div className="updateButton">
              <Button
                variant="contained"
                color="success"
                style={{ textTransform: "none" }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </Container>
      {loading && <Spinner />}
    </>
  );
};

const Container = styled.div`
  margin: 20px;
  .heading > h3 {
    margin: 20px;
    font-size: 25px;
    text-align: center;
  }
  .main-box {
    width: 90%;
    padding: 2% 0;
    margin: 0 auto;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #eff0f5;
    gap: 10px;
    /* overflow: hidden; */
  }
  .box1 {
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 2%;
    border-radius: 5px;
  }
  .box1 > .order-no > p {
    font-size: 14px;
  }
  .box1 > .order-no > p > small {
    font-size: 11px;
    color: gray;
  }
  .total > h5 {
    font-size: 16px;
  }
  .box2 {
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 2%;
    border-radius: 5px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .row > .img-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* background-color: red; */
    flex: 3;
    gap: 10px;
  }

  .row > .img-name > img {
    width: 80px;
    /* background-color: pink; */
  }
  .row > .price {
    flex: 1;
  }
  .row > .quanity {
    flex: 1;
  }
  .box3 {
    display: flex;
    flex-direction: column;
    width: 94%;
  }
  .box3 > .sub-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }
  .sub-box > .address {
    background-color: white;
    width: 100%;
    padding: 2%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    border-radius: 5px;
    font-size: 14px;
  }
  .address > select {
    display: block;
    font-size: 14px;
    font-weight: 500;
    padding: 3px;
    margin: 3px 0;
    background-color: #f4f8f9;
    border: none;
    outline: 1px solid #bddde6;
    &:focus {
      outline: 1px solid #8ab3be;
    }
    border-radius: 3px;
  }
  .sub-box > .total-summary {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding: 2%;
    border-radius: 5px;
    font-size: 14px;
  }
  .total-summary > div {
    display: flex;
    justify-content: space-between;
  }
  .total-summary > hr {
    border: 0;
    border-top: 1px solid lightgray;
    margin: 5px 0;
  }
  .updateButton {
    margin-top: 20px;
    text-align: right;
  }
`;

export default UpdateOrder;
