import React, { useEffect, useState } from "react";
import { AiFillDollarCircle, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsCartX } from "react-icons/bs";
import {
  MdOutlineEditCalendar,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { TbCurrencyTaka, TbTruckDelivery } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { getOrderProducts } from "../../redux/features/order/orderSlice";
import { API } from "../../requestMethod";

const Summary = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const { orderProducts, loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await API.get("/product");
        setProducts(res.data);
      } catch (error) {}
    };
    const getAllUsers = async () => {
      try {
        const res = await API.get("/user/allUsers");
        setUsers(res.data);
      } catch (error) {}
    };
    const getAllCategories = async () => {
      try {
        const res = await API.get("/category");
        setCategories(res.data);
      } catch (error) {}
    };
    getAllProducts();
    getAllUsers();
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getOrderProducts());
    // eslint-disable-next-line
  }, []);

  // Stats

  const tatalStockValue = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const outOfStock = products.filter((product) => product.quantity === 0);

  return (
    <Container>
      <h3 className="header">Inventory Stats</h3>
      <div className="info-box-div">
        <InfoBox color="#b624ff">
          <div className="icon-div">
            <MdOutlineProductionQuantityLimits />
          </div>
          <div className="text-div">
            Total Products <span>{products.length}</span>
          </div>
        </InfoBox>
        <InfoBox color="#32963d">
          <div className="icon-div">
            <AiFillDollarCircle />
          </div>
          <div className="text-div">
            Total Stock Value <span>{tatalStockValue}</span>
          </div>
        </InfoBox>
        <InfoBox color="#689F38">
          <div className="icon-div">
            <MdOutlineEditCalendar />
          </div>
          <div className="text-div">
            Total Orders <span>{orderProducts?.length}</span>
          </div>
        </InfoBox>
        <InfoBox color="#03a5fc">
          <div className="icon-div">
            <AiOutlineUser />
          </div>
          <div className="text-div">
            Total Users <span>{users.length}</span>
          </div>
        </InfoBox>
        <InfoBox color="#6ab04c">
          <div className="icon-div">
            <TbCurrencyTaka />
          </div>
          <div className="text-div">
            Current Month Sell Value<span>0</span>
          </div>
        </InfoBox>
        <InfoBox color="#576574">
          <div className="icon-div">
            <TbTruckDelivery />
          </div>
          <div className="text-div">
            Current Month Delivered Products<span>0</span>
          </div>
        </InfoBox>
        <InfoBox color="#c41849">
          <div className="icon-div">
            <BsCartX />
          </div>
          <div className="text-div">
            Out of Stock<span>{outOfStock.length}</span>
          </div>
        </InfoBox>
        <InfoBox color="#01a3a4">
          <div className="icon-div">
            <BiCategory />
          </div>
          <div className="text-div">
            Categories<span>{categories.length}</span>
          </div>
        </InfoBox>
      </div>
      {loading && <Spinner />}
    </Container>
  );
};

const Container = styled.div`
  h3 {
    display: table;
    margin: 0 auto;
    border-bottom: 2px solid green;
    font-size: 22px;
  }
  .info-box-div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 20px 0;
    margin: 15px 5px;
  }
`;

const InfoBox = styled.div`
  background-color: ${(props) => props.color || "green"};
  height: 120px;
  width: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 5px; */
  color: white;
  .icon-div {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 5px; */
    padding-left: 12px;
    font-size: 40px;
  }
  .text-div {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-right: 15px;
    font-size: 16px;
  }
`;

export default Summary;
