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
import Spinner from "../components/Spinner";
import { getAllCategories } from "../redux/features/category/categorySlice";

const Home = () => {
  const { categories, loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    // eslint-disable-next-line
  }, []);
  return (
    <HomeContainer>
      <Navbar />
      <Slider />
      <MobileMenu />
      <Categories />
      <AllProductsComponent />
      {categories?.map((category) => (
        <CategoryWiseProducts key={category?._id} category={category} />
      ))}
      <Footer />
      {loading && <Spinner />}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: #fcf8f8;
`;

export default Home;
