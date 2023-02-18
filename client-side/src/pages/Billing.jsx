import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { Districts, Divisions, Upazilas } from "../components/Utilities";
import { createOrder } from "../redux/features/order/orderSlice";
import { mobile } from "../responsive";

const Billing = () => {
  const { product, cartQuantity, loading } = useSelector(
    (state) => state.cart?.buyNowProduct
  );
  const { buyNowProduct } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const orderLoading = useSelector((state) => state.order?.loading);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [detailAddress, setAddress] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subTotal = product?.discount
    ? product?.discount * cartQuantity
    : product?.price * cartQuantity;

  const productsWeight = product?.weight * cartQuantity;

  const totalPrice = subTotal + deliveryCharge;

  useEffect(() => {
    const districtName = district.split(",")[0];
    if (districtName === "Dhaka") {
      if (productsWeight <= 1000) {
        setDeliveryCharge(60);
      } else if (productsWeight <= 2000) {
        setDeliveryCharge(90);
      } else {
        const charge = (productsWeight / 1000 - 2) * 15 + 90;
        setDeliveryCharge(charge);
      }
    } else if (!district) {
      setDeliveryCharge(0);
    } else {
      if (productsWeight <= 1000) {
        setDeliveryCharge(120);
      } else if (productsWeight <= 2000) {
        setDeliveryCharge(150);
      } else {
        const charge = (productsWeight / 1000 - 2) * 25 + 150;
        setDeliveryCharge(charge);
      }
    }
  }, [district, productsWeight]);

  const filteredDistricts = Districts?.filter((item) => {
    const divisionId = division.split(",")[1];
    return item?.division_id === divisionId;
  });

  const filteredUpazilas = Upazilas?.filter((item) => {
    const districtId = district.split(",")[1];
    return item?.district_id === districtId;
  });

  const address = {
    division: division.split(",")[0],
    district: district.split(",")[0],
    area: area,
    detailAddress: detailAddress,
  };

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      email &&
      phone &&
      division &&
      district &&
      area &&
      detailAddress
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [
    firstName,
    lastName,
    email,
    phone,
    division,
    district,
    area,
    detailAddress,
  ]);

  const orderData = {
    userId: userInfo?._id,
    name: firstName + " " + lastName,
    email: email,
    phone: phone,
    products: buyNowProduct,
    address: address,
    deliveryCharge: deliveryCharge,
    totalPrice: totalPrice,
    paymentMethod: "COD",
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    dispatch(createOrder(orderData));
    navigate("/order/success");
  };

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
                <img src={product?.img?.url} alt="" />
              </div>
              <div className="cartInfoDiv">
                <h5>{product?.name}</h5>
                <div className="priceandquantity">
                  <h3 style={{ color: "#3bb54a" }}>
                    {product?.discount ? product?.discount : product?.price} Tk
                  </h3>
                  <div className="cartQuantity">
                    <span>Qty : {cartQuantity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="midBottom">
            <h3>Shipping Address</h3>
            <form>
              <label>First Name*</label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter Your First Name"
                required
              />
              <label>Last Name*</label>
              <input
                type="text"
                onChange={(e) => setLasttName(e.target.value)}
                placeholder="Enter Your Last Name"
                required
              />
              <label>Email Address*</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
              />
              <label>Phone Number*</label>
              <input
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Your Phone No"
                required
              />
              <label>Select Your Division*</label>
              <select
                name="division"
                onChange={(e) => setDivision(e.target.value)}
                required
                defaultValue="Select"
              >
                <option value="Select" disabled>
                  Select
                </option>
                {Divisions?.map((item) => (
                  <option key={item?.name} value={[item.name, item.id]}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>Select Your District*</label>
              <select
                name="district"
                onChange={(e) => setDistrict(e.target.value)}
                required
                defaultValue="Select"
              >
                <option value="Select" disabled>
                  Select
                </option>
                {filteredDistricts?.map((item) => (
                  <option key={item?.name} value={[item?.name, item?.id]}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>Select Your Area*</label>
              <select
                name="upazila"
                onChange={(e) => setArea(e.target.value)}
                defaultValue="Select"
                required
              >
                <option value="Select" disabled>
                  Select
                </option>
                {filteredUpazilas?.map((item) => (
                  <option key={item?.name} value={item.name}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <textarea
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Full Address"
                rows="10"
                required
              />
            </form>
          </div>
          <div className="payment-area">
            <h3>Payment Detail</h3>
            <div className="delivery-option">
              <input type="radio" defaultChecked />
              <label>Cash On Delivery</label>
            </div>
          </div>
        </div>
        <div className="bottomSection">
          <div className="total-div">
            <div className="subtotal">
              <h4>Subtotal : </h4>
              <span>{subTotal} TK</span>
            </div>
            <div className="delivery-charge">
              <small style={{ fontWeight: "500" }}>Delivery Charge : </small>
              <small style={{ fontWeight: "500" }}>{deliveryCharge} TK</small>
            </div>
            <div className="total">
              <h2 className="totalAmount">Total :</h2>
              <p style={{ fontWeight: "bold", color: "#3bb54a" }}>
                {totalPrice} Tk
              </p>
            </div>
            <div className="placeButton">
              <button
                disabled={buttonDisable}
                className={buttonDisable ? "disable" : "enable"}
                onClick={(e) => handlePlaceOrder(e)}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </OrderContainer>
      {loading && <Spinner />}
      {orderLoading && <Spinner />}
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
  .midBottom > form > input {
    font-size: 18px;
    padding: 14px;
    border-radius: 5px;
    background-color: #f4f8f9;
    border: none;
    &:focus {
      outline: 1px solid #bddde6;
    }
  }
  .midBottom > form > select {
    font-size: 18px;
    padding: 14px;
    border-radius: 5px;
    background-color: #f4f8f9;
    border: none;
    &:focus {
      outline: 1px solid #bddde6;
    }
  }
  .midBottom > form > select > option {
    font-size: 20px;
    background-color: #f4f8f9;
    border: none;
    &:focus {
      outline: 1px solid #bddde6;
    }
  }
  .midBottom > form > textarea {
    font-size: 18px;
    padding: 14px;
    border-radius: 5px;
    background-color: #f4f8f9;
    border: none;
    &:focus {
      outline: 1px solid #bddde6;
    }
  }

  .payment-area {
    width: 70%;
    margin: 10px 10px;
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

  .payment-area > h3 {
    padding: 0 10px;
  }

  .delivery-option {
    padding: 0 10px;
    display: flex;
    gap: 10px;
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
    z-index: 9;
    background-color: white;
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

  .total-div > .subtotal > * {
    font-weight: 500;
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
  .placeButton > .disable {
    cursor: not-allowed;
    background-color: #66b471a0;
  }
  .placeButton > .enable {
    cursor: pointer;
  }
`;

export default Billing;
