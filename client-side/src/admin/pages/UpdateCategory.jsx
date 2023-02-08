import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { updateCategory } from "../../redux/features/category/categorySlice";
import { API } from "../../requestMethod";
import AdminHeader from "../components/AdminHeader";

const UpdateCategory = () => {
  const { categoryUrl } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState({});
  const [categoryImage, setCategoryImage] = useState({});
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/category/${categoryUrl}`);
        setCategory(response.data);
        setCategoryName(response.data.name);
        setCategoryImage(response.data?.img?.url);
      } catch (error) {}
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const SaveCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image);
    formData.append("imgUrl", category.img.url);
    formData.append("publicid", categoryImage.publicid);
    formData.append("id", category._id);
    dispatch(updateCategory({ formData, navigate, categoryUrl }));
  };

  return (
    <>
      <AdminHeader />
      <Container>
        <h3>Update Category</h3>
        <div className="box">
          <form className="form" onSubmit={(e) => SaveCategory(e)}>
            <div className="imgDiv">
              <label>Category Image</label>
              <small>Supported Formats : jpg, jpeg, png</small>
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {imagePreview != null ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="img" />
                </div>
              ) : (
                <div className="image-preview">
                  <img src={categoryImage} alt="img" />
                </div>
              )}
            </div>
            <div className="categoryName">
              <label>Category Name : </label>
            </div>
            <input
              type="text"
              name="name"
              value={categoryName}
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
                Update Category
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
    border: 1px solid #bddde6;
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
    padding: 14px;
    margin: 10px;
    width: 90%;
    background-color: #f4f8f9;
    border: none;
    &:focus {
      outline: 1px solid #bddde6;
    }
    border-radius: 3px;
  }
  .imgDiv > input {
    display: block;
    font-size: 18px;
    font-weight: 500;
    padding: 10px;
    margin: 10px;
    width: 90%;
    background-color: #f4f8f9;
    border: none;
    &:focus {
      outline: 1px solid #bddde6;
    }
    border-radius: 3px;
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

export default UpdateCategory;
