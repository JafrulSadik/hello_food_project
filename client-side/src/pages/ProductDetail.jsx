import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { GroceryItems } from "../data";
import { mobile } from "../responsive";
import  {toast, ToastContainer }  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "minus") {
      setQuantity(quantity > 1 ? quantity - 1 : 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const notify = () => {
    toast.success('Successfully added to cart', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light"
    })
  }

  return (
    <>
      <Navbar />
      <ProductDetailContainer>
        <div className="wrapper">
          <section className="topSection">
            <div className="imageDiv">
              <img
                src="https://i.ibb.co/K6dxfyc/Himalay-pink-salt-gura.jpg"
                alt=""
              />
            </div>
            <div className="infoDiv">
              <h3>Himalayan Natural Pink Salt Rock Salt 1 kg</h3>
              <p>Availabilty : In Stock</p>
              <h4>320 Tk</h4>
              <p>Quantity:</p>
              <div className="priceChoosen">
                <button
                  type="button"
                  style={{
                    backgroundColor: quantity > 1 ? "#3bb54a" : "#7cce86",
                    cursor: quantity > 1 ? "pointer" : "not-allowed",
                  }}
                  onClick={() => handleQuantity("minus")}
                >
                  <AiOutlineMinus />
                </button>
                <input
                  type="text"
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  value={quantity ? quantity : 1}
                />
                <button
                  name="plus"
                  type="button"
                  onClick={() => handleQuantity("plus")}
                >
                  <AiOutlinePlus />
                </button>
              </div>
              <div className="addAndBuy">
                <button onClick={notify} className="addToCart" type="button">
                  Add to cart
                </button>
                <Link to='/order' className="link">
                  <button className="buyNow" type="button">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <section className="midSection">
            <h5>
              <span>Description</span>
            </h5>
            <div className="descDiv">
              <h3>Himalayan Natural Pink Salt Rock Salt 1 kg</h3>
              <ul>
                <li>Origin: Pakistan</li>
                <li>Weight: 1 kg</li>
                <li>জার প্যাক</li>
                <li>Quality Pure</li>
                <li>All thing buy at wholesale price</li>
                <li>99% clients satisfaction</li>
              </ul>
              <p>
                রোগ প্রতিরোধ ক্ষমতা থাকেসৈন্ধব লবণের প্রাকৃতিক উপায়েতৈরি হয় এই
                লবণ ফলে ঠান্ডা লাগা, জ্বর, ফ্লু, অ্যালার্জির মতো বেশ কিছু রোগের
                হাত থেকে শরীরকে বাঁচায়।দ্বিতীয়ত দেহের ওজন কমায়৷ দেহে
                ডাইজেস্টিভ জুস উৎপন্ন করে যা খুব তাড়াতাড়ি খাবার হজম করতে
              </p>
            </div>
          </section>
          <section className="bottomSection">
            <h2>
              <span>You may also like</span>
            </h2>
            <div className="similarProducts">
              {GroceryItems.map((item) => {
                return <ProductCard item={item} key={item.id} />;
              })}
            </div>
          </section>
        </div>
      </ProductDetailContainer>
      <MobileMenu />
      <Footer />
      <ToastContainer />
    </>
  );
};

const ProductDetailContainer = styled.div`
  .wrapper {
    margin: 50px 100px;
    ${mobile({
      margin: "20px 10px",
    })}
  }
  .topSection {
    display: flex;
    justify-content: space-around;
    /* height: 500px; */
    background-color: #fff;
    ${mobile({
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    })}
  }
  .topSection .imageDiv {
    flex: 1;
    width: 100%;
    text-align: center;
    /* border: 1px solid red; */
  }
  .topSection > .imageDiv > img {
    width: 400px;
    height: 400px;
    ${mobile({
      width: "290px",
      height: "310px",
    })}
  }
  .topSection .infoDiv {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px;
    ${mobile({
      padding: "20px 20px",
    })}
  }
  .topSection > .infoDiv > h3 {
    font-size: 20px;
  }
  .topSection > .infoDiv > h4 {
    font-size: 20px;
  }
  .priceChoosen {
    width: 110px;
    border: 1px solid #3bb54a;
    display: flex;
    background-color: #3bb54a;
  }
  .priceChoosen button {
    flex: 1;
    padding: 8px;
    border: none;
    background-color: #3bb54a;
    color: white;
    cursor: pointer;
  }
  .priceChoosen input {
    text-align: center;
    padding: 8px;
    width: 20px;
    border: none;
    outline: none;
  }
  .addAndBuy {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 15px;
  }
  .addAndBuy > .link {
    text-decoration: none;
  }
  .addAndBuy button {
    padding: 10px;
    width: 40%;
    border: none;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    ${mobile({
      width: "100%",
    })}
  }
  .addAndBuy .addToCart {
    background-color: #ee6443;
    &:hover {
      background-color: #c54525;
      transition: 0.3s;
    }
  }
  .addAndBuy .buyNow {
    background-color: #3bb54a;
    &:hover {
      background-color: #02903d;
      transition: 0.3s;
    }
  }
  .midSection {
    background-color: #fff;
    margin: 40px 0;
    padding: 20px;
    ${mobile({
      margin: "20px 0",
      padding: "5px 20px",
    })}
  }
  .midSection h5 {
    font-size: 18px;
    margin: 10px;
  }
  .midSection span {
    border-bottom: 2px solid green;
  }
  .midSection .descDiv {
    margin: 20px 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    ${mobile({
      margin: "10px",
    })}
  }
  .descDiv ul {
    padding: 20px 40px;
    ${mobile({
      padding: "10px 30px",
    })}
  }
  .bottomSection > h2 {
    text-align: center;
    margin: 30px;
  }
  .bottomSection > h2 > span {
    border-bottom: 2px solid green;
  }
  .bottomSection > .similarProducts {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 5px;

    ${mobile({
      justifyContent: "space-evenly",
      gap: "15px 0px",
    })}
  }
`;
export default ProductDetail;
