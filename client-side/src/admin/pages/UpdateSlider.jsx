import { Button } from "@mui/material";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import AdminHeader from "../components/AdminHeader";

const UpdateSlider = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.product);

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  //   const saveProduct = (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("productCode", product.productCode);
  //     formData.append("name", product.name);
  //     formData.append("category", product.category);
  //     formData.append("quantity", Number(product.quantity));
  //     formData.append("price", Number(product.price));
  //     formData.append("description", description);
  //     formData.append("image", prooductImage);
  //     dispatch(createNewProduct({ formData, navigate }));
  //   };

  return (
    <>
      <AdminHeader />
      <Container>
        <h3>Update Slider</h3>
        <div className="box">
          <form className="form">
            <div className="imgDiv">
              <label>Slider Image</label>
              <small>Supported Formats : jpg, jpeg, png</small>
              <input
                type="file"
                name="image"
                required
                onChange={(e) => handleImageChange(e)}
              />
              {imagePreview != null && (
                <div className="image-preview">
                  <img src={imagePreview} alt="img" />
                </div>
              )}
            </div>
            <div className="categoryName">
              <label>Slider Name : </label>
            </div>
            <input
              type="text"
              name="name"
              required
              placeholder="Category Name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="buttonDiv">
              {error && <p>{message}</p>}
              <Button
                type="submit"
                variant="contained"
                style={{ textTransform: "none", backgroundColor: "#18a753" }}
              >
                Update Slider
              </Button>
            </div>
          </form>
        </div>
        {loading && <Spinner />}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 20px 30px;
  width: 100%;
  height: 100%;
  h3 {
    padding: 15px;
    padding-top: 5px;
    text-align: center;
    font-size: 25px;
    color: rgb(0, 128, 0);
  }
  .box {
    width: 80%;
    margin: 0 auto;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow: hidden;
  }
  .box > .form {
    margin: 40px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .box > .form .imgDiv {
    border: 1px solid gray;
    padding: 10px;
    width: 90%;
    margin: 10px 10px;
    border-radius: 5px;
  }
  .image-preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image-preview > img {
    height: 250px;
    width: 250px;
  }
  .form > label {
    font-size: 18px;
    font-weight: 600;
    margin: 10px 10px;
    display: block;
  }
  .imgDiv > label {
    font-size: 18px;
    font-weight: 600;
    margin: 10px 10px;
  }
  .form > input {
    display: block;
    font-size: 18px;
    font-weight: 500;
    padding: 10px;
    margin: 10px;
    width: 90%;
    border: 1px solid #777;
    border-radius: 3px;
    outline: none;
  }
  .imgDiv > input {
    display: block;
    font-size: 18px;
    font-weight: 500;
    padding: 10px;
    margin: 10px;
    width: 95%;
    border: 1px solid #777;
    border-radius: 3px;
    outline: none;
  }
  .categoryName {
    width: 90%;
    margin: 10px;
    font-weight: 600;
    font-size: 18px;
  }
  .buttonDiv {
    margin: 2%;
    text-align: center;
  }
  .buttonDiv > p {
    color: red;
    text-align: center;
  }
`;

export default UpdateSlider;
