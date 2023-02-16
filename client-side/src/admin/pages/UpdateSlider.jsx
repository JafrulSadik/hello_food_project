import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { updateSlider } from "../../redux/features/slider/sliderSlice";
import { API } from "../../requestMethod";
import AdminHeader from "../components/AdminHeader";

const UpdateSlider = () => {
  const { id } = useParams();
  const [slider, setSlider] = useState({});
  const [sliderName, setSliderName] = useState("");
  const [sliderImage, setSliderImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.slider);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/slider/${id}`);
        setSlider(response.data);
        setSliderName(response.data.name);
        setSliderImage(response.data?.img?.url);
      } catch (error) {}
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  const handleImageChange = (e) => {
    setSliderImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", sliderName);
    formData.append("publicid", slider.img?.publicid);
    formData.append("imgUrl", slider.img?.url);
    formData.append("image", sliderImage);
    formData.append("id", id);
    dispatch(updateSlider({ formData, navigate, id }));
  };

  return (
    <>
      <AdminHeader />
      <Container>
        <h3>Update Slider</h3>
        <div className="box">
          <form className="form" onSubmit={(e) => handleUpdate(e)}>
            <div className="imgDiv">
              <label>Slider Image</label>
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
                  <img src={sliderImage} alt="img" />
                </div>
              )}
            </div>
            <div className="sliderName">
              <label>Slider Name : </label>
            </div>
            <input
              type="text"
              name="name"
              value={sliderName}
              required
              placeholder="Slider Name"
              onChange={(e) => setSliderName(e.target.value)}
            />
            <div className="buttonDiv">
              {error && <p>Error</p>}
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
  .sliderName {
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
