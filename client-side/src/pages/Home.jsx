import React from "react";
import styled from "styled-components";
import AllProducts from "../components/AllProducts";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import GroceryProducts from "../components/GroceryProducts";
import HairCareProducts from "../components/HairCareProducts";
import MedicinalHerbsProducts from "../components/MedicinalHerbsProducts";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import SkinCareProducts from "../components/SkinCareProducts";
import Slider from "../components/Slider";


const Home = () => {
  return (
    <HomeContainer>
      <Navbar/>
      <Slider/>
      <MobileMenu/>
      <Categories/>
      <AllProducts/>
      <GroceryProducts/>
      <HairCareProducts/>
      <MedicinalHerbsProducts/>
      <SkinCareProducts/>
      <Footer/>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: #fcf8f8;
`

export default Home;
