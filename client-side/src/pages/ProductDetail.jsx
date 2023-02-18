import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import {
  addToCart,
  add_buy_now_product,
  add_To_Cart,
} from "../redux/features/cart/cartSlice";
import { getSingleCategory } from "../redux/features/category/categorySlice";
import { getSingleProduct } from "../redux/features/product/productSlice";
import { mobile } from "../responsive";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { productUrl } = useParams();
  const { product, loading } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const { userInfo } = useSelector((state) => state.auth);
  const categoryUrl = product?._category?.categoryUrl;
  const dispatch = useDispatch();

  const similarProducts = category?.products?.filter(
    (item) => item?._id !== product?._id
  );

  useEffect(() => {
    dispatch(getSingleProduct(productUrl));
    categoryUrl && dispatch(getSingleCategory(categoryUrl));
    // eslint-disable-next-line
  }, [productUrl, categoryUrl]);

  const handleQuantity = (type) => {
    if (type === "minus") {
      setQuantity(quantity > 1 ? quantity - 1 : 1);
    } else {
      setQuantity(
        product?.quantity > quantity && quantity < 10 ? quantity + 1 : quantity
      );
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (userInfo) {
      dispatch(
        addToCart({
          id: userInfo?._id,
          product,
          cartQuantity: quantity,
        })
      );
    } else {
      dispatch(add_To_Cart({ product, cartQuantity: quantity }));
    }
  };

  const handleBuyNow = (e) => {
    dispatch(add_buy_now_product({ product, cartQuantity: quantity }));
  };

  const stockAvailablity = () => {
    if (product?.quantity === 0) {
      return <span className="out-of-stock">Out Of Stock</span>;
    } else {
      return <span className="in-stock">In Stock</span>;
    }
  };

  return (
    <>
      <Navbar />
      <ProductDetailContainer>
        <div className="wrapper">
          <section className="topSection">
            <div className="imageDiv">
              <img src={product?.img?.url} alt="" />
            </div>
            <div className="infoDiv">
              <h3>{product?.name}</h3>
              <p className="availabilty">Availabilty : {stockAvailablity()}</p>
              <h4 style={{ color: "#3bb54a" }}>
                {product?.discount ? product?.discount : product?.price} Tk
              </h4>
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
                  style={{
                    cursor: product?.quantity === 0 ? "not-allowed" : "pointer",
                  }}
                  onClick={() => handleQuantity("plus")}
                >
                  <AiOutlinePlus />
                </button>
              </div>
              <div className="addAndBuy">
                <button
                  disabled={product?.quantity === 0 && "disabled"}
                  style={{
                    cursor: product?.quantity === 0 && "not-allowed",
                    backgroundColor: product?.quantity === 0 && "#ee65439e",
                  }}
                  onClick={(e) => handleAddToCart(e)}
                  className="addToCart"
                  type="button"
                >
                  Add to cart
                </button>
                <Link to="/billing" className="link">
                  <button
                    disabled={product?.quantity === 0 && "disabled"}
                    style={{
                      cursor: product?.quantity === 0 && "not-allowed",
                      backgroundColor: product?.quantity === 0 && "#7cce86",
                    }}
                    className="buyNow"
                    type="button"
                    onClick={(e) => handleBuyNow(e)}
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <section className="midSection">
            <h5>
              <span className="des-heading">Description</span>
            </h5>
            <div
              className="descDiv"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description),
              }}
            ></div>
          </section>
          <section className="bottomSection">
            <h2>
              <span>You may also like</span>
            </h2>
            <div className="similarProducts">
              {similarProducts
                ?.map((item) => {
                  return <ProductCard item={item} key={item._id} />;
                })
                .slice(0, 10)}
            </div>
          </section>
        </div>
      </ProductDetailContainer>
      <MobileMenu />
      <Footer />
      {loading && <Spinner />}
    </>
  );
};

const ProductDetailContainer = styled.div`
  .wrapper {
    margin: 5%;
    ${mobile({
      margin: "20px 10px",
    })}
  }
  .topSection {
    display: flex;
    justify-content: space-around;
    margin: 5% 15%;
    /* height: 500px; */
    background-color: #fff;
    ${mobile({
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      margin: "0",
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
  .infoDiv > .availabilty > .in-stock {
    color: green;
  }
  .infoDiv > .availabilty > .out-of-stock {
    color: red;
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
    width: 100%;
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
  .midSection > .des-heading {
    border-bottom: 2px solid green;
  }
  .midSection .descDiv {
    margin: 20px 50px;
    text-decoration: none;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 10px;

    ${mobile({
      gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
      margin: "4%",
    })}
  }
`;
export default ProductDetail;
