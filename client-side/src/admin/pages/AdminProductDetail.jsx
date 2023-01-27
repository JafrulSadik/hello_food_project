import { Button } from "@mui/material";
import DOMPurify from "dompurify";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import Spinner from "../../components/Spinner";
import {
  deleteProduct,
  getSingleProduct,
} from "../../redux/features/product/productSlice";
import AdminHeader from "../components/AdminHeader";

const AdminProductDetail = () => {
  const { productUrl } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleProduct(productUrl));
    //eslint-disable-next-line
  }, []);

  // console.log(product._id);

  const handleDelete = () => {
    dispatch(deleteProduct(product._id));
    navigate("/admin/products");
  };

  const confirmDelete = () => {
    swal({
      text: "Are you sure want to delete this product?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete();
      } else {
      }
    });
  };

  return (
    <>
      <AdminHeader />
      <Container>
        <h3>
          <strong>Product Detail</strong>
        </h3>
        <div className="box">
          <div className="imgDiv">
            <img src={product?.img?.url} alt="" />
          </div>
          <div className="infoDiv">
            <h4>
              Product Availability :{" "}
              {product?.quantity > 0 ? (
                <span className="inStock">In Stock</span>
              ) : (
                <span className="outOfStock">Out Of Stock</span>
              )}
            </h4>
            <hr />
            <h4>
              <span className="name">Name : </span>
              {product?.name}
            </h4>
            <p>
              <b>Product Code : </b> {product?.productCode}
            </p>
            <p>
              <b>Category : </b> {product?._category?.name}
            </p>
            <p>
              <b>Price : </b> {product?.price} TK
            </p>
            <p>
              <b>Quantity : </b> {product?.quantity}
            </p>
            <p>
              <b>Total Value : </b> {product?.quantity * product?.price} Tk
            </p>
            <hr />
            <b>Description : </b>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description),
              }}
            ></div>
            <hr />
            <small>Created on : {product?.createdAt}</small>
            <small>Updated on : {product?.updatedAt}</small>
            <div className="buttonDiv">
              <Button
                variant="contained"
                style={{ textTransform: "none", backgroundColor: "#18a753" }}
              >
                Edit
              </Button>
              <Button
                onClick={confirmDelete}
                variant="contained"
                style={{ textTransform: "none", backgroundColor: "red" }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        {loading && <Spinner />}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-bottom: 200px;
  h3 {
    margin: 20px;
    font-size: 25px;
    text-align: center;
  }
  strong {
    border-bottom: 2px solid green;
  }
  .box {
    width: 70%;
    padding: 20px;
    margin: 0 auto;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
  }
  .imgDiv {
    /* border: 1px solid gray; */
    padding: 20px 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imgDiv > img {
    height: 50vh;
    /* width: 100%; */
    /* border: 1px solid gray; */
  }
  .infoDiv {
    width: 75%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .inStock {
    color: green;
  }
  .outOfStock {
    color: red;
  }
  .name {
    background-color: green;
    color: white;
    padding: 3px 8px;
    border-radius: 2px;
    margin-right: 5px;
  }
  .description {
    padding-left: 30px;
  }
  .buttonDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;

export default AdminProductDetail;
