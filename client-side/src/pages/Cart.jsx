import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import {
  decrease_Cart,
  get_Totals,
  increase_Cart,
  remove_From_Cart,
} from "../redux/features/cart/cartSlice";

const Cart = () => {
  const { cartProducts, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_Totals());
  }, [cartProducts, dispatch]);

  const handleDecreaseCart = (product) => {
    dispatch(decrease_Cart(product));
  };

  const handleIncreaseCart = (product) => {
    dispatch(increase_Cart(product));
  };

  const handleRemoveCart = (product) => {
    dispatch(remove_From_Cart(product));
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
        {cartProducts?.map((product) => (
          <div className="mid" key={product?._id}>
            {/* <div className="check">
              <input
                type="checkbox"
                onChange={() => handleCheckbox(product)}
                name=""
              />
            </div> */}
            <div className="cartImgDiv">
              <Link className="img-link" to={`/product/${product.productUrl}`}>
                <img src={product?.img?.url} alt="product-img" />
              </Link>
            </div>
            <div className="cartInfoDiv">
              <Link className="name-link" to={`/product/${product.productUrl}`}>
                <h5>{product?.name}</h5>
              </Link>
              <div className="priceandquantity">
                <h3>
                  {product?.discount ? product?.discount : product?.price} Tk
                </h3>
                <div className="cartQuantity">
                  <span
                    className="iconMinus"
                    onClick={() => handleDecreaseCart(product)}
                  >
                    <BiMinus />
                  </span>
                  <p>{product?.cartQuantity}</p>
                  <span
                    className="iconPlus"
                    onClick={() => handleIncreaseCart(product)}
                  >
                    <BiPlus />
                  </span>
                </div>
              </div>
              <div className="remove-div">
                <Button
                  variant="contained"
                  onClick={() => handleRemoveCart(product)}
                  size="small"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="bottom">
          <div className="checkOut">
            <div className="shippingAndTotal">
              <h4>
                Total : <span className="priceTotal">{cartTotalAmount} TK</span>
              </h4>
            </div>
            <Link to="/order" className="order-link">
              <Button variant="contained" size="small">
                Check Out
              </Button>
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
    margin: 10px 30px;
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
  .mid > .cartImgDiv > .img-link > img {
    height: 100px;
    width: 100px;
  }
  .mid > .cartInfoDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* gap: 5px; */
  }
  .name-link {
    text-decoration: none;
    color: inherit;
    margin-bottom: 7px;
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
    padding: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
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
  .remove-div > button {
    background-color: black;
    color: white;
    border-radius: 5px;
    text-transform: none;
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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
  .checkOut > .order-link {
    text-decoration: none;
    color: white;
  }
  .order-link > Button {
    /* padding: 8px 10px; */
    background-color: #3bb54a;
  }
`;

export default Cart;
