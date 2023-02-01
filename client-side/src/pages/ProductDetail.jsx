import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { getSingleCategory } from "../redux/features/category/categorySlice";
import { getSingleProduct } from "../redux/features/product/productSlice";
import { mobile } from "../responsive";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { productUrl } = useParams();
  const { product, loading } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
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
      setQuantity(product?.quantity === 0 ? quantity + 0 : quantity + 1);
    }
  };
  const notify = () => {
    toast.success("Successfully added to cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "light",
    });
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
              <h4>{product?.price} Tk</h4>
              <p>Quantity: {product?.quantity}</p>
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
                  onClick={notify}
                  className="addToCart"
                  type="button"
                >
                  Add to cart
                </button>
                <Link to="/order" className="link">
                  <button
                    disabled={product?.quantity === 0 && "disabled"}
                    style={{
                      cursor: product?.quantity === 0 && "not-allowed",
                      backgroundColor: product?.quantity === 0 && "#7cce86",
                    }}
                    className="buyNow"
                    type="button"
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
              {similarProducts?.map((item) => {
                return <ProductCard item={item} key={item._id} />;
              })}
            </div>
          </section>
        </div>
      </ProductDetailContainer>
      <MobileMenu />
      <Footer />
      <ToastContainer />
      {loading && <Spinner />}
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
