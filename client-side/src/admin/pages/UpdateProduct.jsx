import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { API } from "../../requestMethod";
import AdminHeader from "../components/AdminHeader";

const UpdateProduct = () => {
  const [prooductImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [catgories, setCatgories] = useState([]);
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { productUrl } = useParams();
  const { loading } = useSelector((state) => state.product);
  const productEdit = useSelector((state) => state.product?.product);

  const [product, setProduct] = useState({
    productCode: "",
    name: "",
    _category: "",
    quantity: "",
    price: "",
  });
  //   const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  //   console.log(product);

  useEffect(() => {
    const productData = async () => {
      try {
        const res = await API.get(`/product/${productUrl}`);
        setProduct(res.data);
      } catch (error) {}
    };
    productData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/category");
        setCatgories(response.data);
        setProduct({
          _category: response.data[0]._id,
        });
      } catch (error) {}
    };
    fetchData();
    // dispatch(getSingleProduct(productUrl));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDescription(productEdit?.description);
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productCode", product?.productCode);
    formData.append("name", product?.name);
    formData.append("category", product?._category);
    formData.append("quantity", Number(product?.quantity));
    formData.append("price", Number(product?.price));
    formData.append("description", description);
    formData.append("image", prooductImage);
    console.log(...formData);
    // dispatch(createNewProduct({ formData, navigate }));
  };

  return (
    <>
      <AdminHeader />
      <Container>
        <h3>Update Product of {productEdit?.name} </h3>
        <div className="box">
          <form onSubmit={(e) => updateProduct(e)}>
            <div className="imgDiv">
              <label>Product Image</label>
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
                  <img src={productEdit?.img?.url} alt="img" />
                </div>
              )}
            </div>
            <label>Product Code : </label>
            <input
              type="text"
              name="productCode"
              value={product?.productCode}
              required
              placeholder="Product Code"
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Name : </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Product Name"
              value={product?.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Category : </label>
            <select name="category" onChange={(e) => handleInputChange(e)}>
              {catgories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="">Product Price :</label>
            <input
              type="text"
              name="price"
              required
              value={product?.price}
              placeholder="Product Price"
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="">Product Quantity :</label>
            <input
              type="text"
              name="quantity"
              required
              value={product?.quantity}
              placeholder="Product Quantity"
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="">Product Description : </label>
            <ReactQuill
              theme="snow"
              className="description"
              value={description}
              onChange={setDescription}
              modules={UpdateProduct.modules}
              formats={UpdateProduct.formats}
            />
            <div className="buttonDiv">
              {/* {error && <p>{message}</p>} */}
              <Button
                type="submit"
                variant="contained"
                style={{ textTransform: "none", backgroundColor: "#18a753" }}
              >
                Update Product
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
  h3 {
    padding: 15px;
    padding-top: 5px;
    text-align: center;
    font-size: 25px;
    color: rgb(0, 128, 0);
  }
  .box {
    width: 80%;
    padding: 20px;
    margin: 0 auto;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow: hidden;
  }
  .imgDiv {
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
  form {
    label {
      font-size: 18px;
      font-weight: 600;
      margin: 10px 10px;
    }
    input[type="text"],
    input[type="number"],
    input[type="file"],
    input[type="email"],
    select,
    input[type="password"] {
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
    select {
      width: 92.5%;
    }
    .description {
      padding: 12px;
      font-size: 25px;
      width: 93%;
      .ql-container {
        height: 250px;
      }
      .ql-editor > p {
        font-size: 18px;
      }
    }
    .buttonDiv {
      margin: 2% 5%;
      text-align: right;
    }
    .buttonDiv > p {
      color: red;
      text-align: center;
    }
  }
`;

UpdateProduct.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
UpdateProduct.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default UpdateProduct;
