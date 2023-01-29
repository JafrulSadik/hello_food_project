import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from "../components/Navbar";

const Cart = () => {
    const [quantity, setQuantity] = useState(1)
    return (
        <>
        <Navbar />
        <CartContainer>
            <div className="header">
                <Link to='/'><FontAwesomeIcon icon={faAngleLeft} className='iconLeft' /></Link>
                <h3>My Cart</h3>
            </div>
            <div className="mid">
                <div className="check">
                    <input type="checkbox" name=""  />
                </div>
                <div className="cartImgDiv">
                    <img src="https://i.ibb.co/K6dxfyc/Himalay-pink-salt-gura.jpg" alt="" />
                </div>
                <div className="cartInfoDiv">
                    <h5>Himalayan Natural Pink Salt Rock Salt 1 kg</h5>
                    <div className="priceandquantity">
                        <h3>320 Tk</h3>
                        <div className='cartQuantity'>
                            <span className='iconMinus' onClick={() => setQuantity((prev) => quantity > 1 ? prev -1 : 1)}><AiOutlineMinus /></span>
                            <input type="text" onChange={(e) => setQuantity(e.target.value)} value={quantity ? quantity : 1} />
                            <span className='iconPlus' onClick={() => setQuantity((prev) => prev + 1)}><AiOutlinePlus /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="checkAll">
                    <input type="checkbox" name="" />
                    <span>All</span>
                </div>
                <div className="checkOut">
                    <div className="shippingAndTotal">
                        <small>Shipping : <span className='priceShipping'>0</span></small>
                        <h4>Total : <span className='priceTotal'>0</span></h4>
                    </div>
                    <Link to='/order' className='link'><span className='buttonCheckOut'>Check Out</span></Link>
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
    margin: 10px;
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
.mid > .cartImgDiv > img {
    height: 100px;
    width: 100px;
}
.mid > .cartInfoDiv {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.mid > .cartInfoDiv > .priceandquantity {
    display: flex;
    justify-content: space-between;
}
.cartInfoDiv > .priceandquantity > h3 {
    color: red;
}
.cartInfoDiv > .priceandquantity > .cartQuantity{
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0 10px;
}
.priceandquantity > .cartQuantity > .iconMinus {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.priceandquantity > .cartQuantity > .iconPlus {
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
.bottom {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.bottom .checkAll {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
.checkOut > .link {
    text-decoration: none;
    color: white;
}
.buttonCheckOut {
    padding: 8px 10px;
    background-color: #3bb54a;
    border-radius: 5px;
}

`

export default Cart;