import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllCategories } from "../redux/features/category/categorySlice";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 50px 0;
  color: #1c7658;

  ${mobile({
    marginTop: "20px",
    marginBottom: "0px",
  })}
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: space-around;
  align-items: center;

  ${mobile({
    justifyContent: "center",
    gap: "0px 10px",
    margin: "0px 10px",
  })}
`;
const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 160px;
  width: 240px;
  flex-basis: 150px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 0 15px #aca7a715;
  color: #01936c;

  &:hover {
    /* border: 2px solid #14a7761f; */
    color: #01936c;
  }

  ${mobile({
    height: "80px",
    flexBasis: "0",
    flex: 1,
  })}
`;
const ImageDiv = styled.div`
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */

  ${mobile({
    height: "45px",
    width: "",
  })}
`;
const Image = styled.img`
  height: 80px;
  width: 100px;

  ${mobile({
    height: "40px",
    width: "100%",
  })}
`;
const TextDiv = styled.div`
  text-align: center;
  /* background-color: pink; */
  ${mobile({
    height: "20px",
    width: "100%",
  })}
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 700;

  ${mobile({
    height: "",
    width: "",
    fontSize: "8px",
    fontWeight: "400",
  })}
`;

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <Wrapper>
        {categories.map((category) => {
          return (
            <Card
              to={`/categories/${category?.categoryUrl}`}
              key={category?._id}
            >
              <ImageDiv>
                <Image src={category?.img?.url} />
              </ImageDiv>
              <TextDiv>
                <Text>{category?.name}</Text>
              </TextDiv>
            </Card>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default Categories;
