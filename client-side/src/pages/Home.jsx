import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AllProductsComponent from "../components/AllProductsComponent";
import Categories from "../components/Categories";
import CategoryWiseProducts from "../components/CategoryWiseProducts";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { getAllCategories } from "../redux/features/category/categorySlice";

const Home = () => {
  const { categories } = useSelector((state) => state.category);
  // const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    // eslint-disable-next-line
  }, []);

  return (
    <HomeContainer>
      <Navbar />
      <div className="container">
        <Slider />
        <MobileMenu />
        <Categories />
        <AllProductsComponent />
        {categories?.map((category) => (
          <CategoryWiseProducts key={category?._id} category={category} />
        ))}
      </div>
      <Footer />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: #fcf8f8;
  .container {
    min-height: 100vh;
  }
`;

export default Home;
