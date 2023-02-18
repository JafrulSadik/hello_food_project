import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { getOrderByUser } from "../redux/features/order/orderSlice";

const MyOrders = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { orderProducts, loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(getOrderByUser(userInfo?._id));
    }
    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <>
      <Navbar />
      <MyOrdersContainer>
        <div className="header">
          <Link to="/account">
            <FontAwesomeIcon icon={faAngleLeft} className="iconLeft" />
          </Link>
          <h3>My Orders</h3>
        </div>
        {orderProducts.map((item) => {
          console.log(item);
          return (
            <div className="product" key={item?._id}>
              <div className="top">
                <h4>Order No : {item?._id}</h4>
                <p>
                  <small>Placed on 03 Oct 2022</small>
                </p>
              </div>
              {item?.products?.map((product1) => {
                console.log(product1);
                const { product } = product1;
                return (
                  <div className="mid" key={product?._id}>
                    <div className="imgDiv">
                      <img src={product?.img?.url} alt="" />
                    </div>
                    <div className="infoDiv">
                      <h5>{product?.name}</h5>
                      <h4>
                        {product?.discount ? product?.discount : product?.price}{" "}
                        TK
                      </h4>
                      <div className="itemAndStatus">
                        <span>{product1?.cartQuantity} Item</span>
                        <span className="status">{item?.deliveryStatus}</span>
                      </div>
                      <div className="infoBottom">
                        <span>
                          <small>Total:</small>
                        </span>
                        <span className="price">{item?.totalPrice} TK</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </MyOrdersContainer>
      <MobileMenu />
      {loading && <Spinner />}
    </>
  );
};

const MyOrdersContainer = styled.div`
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
  .header > .iconLeft {
    font-size: 22px;
    display: flex;
    align-items: center;
    color: black;
  }
  .product {
    margin: 20px 5%;
    color: #474444fa;
    border-bottom: 0.5px solid lightgray;
  }
  .top {
  }
  .top > h4 {
    font-weight: 600;
  }
  .mid {
    display: flex;
    gap: 30px;
    margin: 10px 0;
  }
  .mid > .imgDiv {
  }
  .mid > .imgDiv > img {
    width: 70px;
    height: 70px;
  }
  .mid > .infoDiv {
    width: 100%;
  }
  .mid > .infoDiv > .itemAndStatus {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .status {
    background-color: #36a736;
    color: white;
    padding: 4px 10px;
    font-weight: 400;
    font-size: 12px;
    border-radius: 30px;
  }
  .infoBottom {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
  }
  .infoBottom > span {
    margin-right: 5px;
  }
  .infoBottom > .price {
    color: green;
    font-weight: 700;
  }
`;
export default MyOrders;
