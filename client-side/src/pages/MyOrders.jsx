import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const MyOrders = () => {
    return (
        <>
        <Navbar />
        <MyOrdersContainer>
            <div className="header">
                <Link to='/account'><FontAwesomeIcon icon={faAngleLeft} className='iconLeft' /></Link>
                <h3>My Orders</h3>
            </div>
            <div className="product">
                <div className="top">
                    <h4>Order No : 635254548582</h4>
                    <p><small>Placed on 03 Oct 2022</small></p>
                </div>
                <div className="mid">
                    <div className="imgDiv">
                        <img src="https://i.ibb.co/K6dxfyc/Himalay-pink-salt-gura.jpg" alt="" />
                    </div>
                    <div className="infoDiv">
                        <h5>Himalayan Natural Pink Salt Rock Salt 1 kg</h5>
                        <h4>320 TK</h4>
                        <div className="itemAndStatus">
                                <span>1 Item</span>
                                <span className='status'>Processing</span>
                        </div>
                        <div className="infoBottom">
                            <span><small>1 Item, Total:</small></span>
                            <span className='price'>320 TK</span>
                        </div>
                    </div>
                </div>
            </div>
        </MyOrdersContainer>
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
.header .iconLeft {
   font-size: 22px;
   display: flex;
   align-items: center;
   color: black;
}
.product {
    margin: 20px 10px;
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
.mid > .infoDiv > .itemAndStatus {
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
    
`
export default MyOrders;