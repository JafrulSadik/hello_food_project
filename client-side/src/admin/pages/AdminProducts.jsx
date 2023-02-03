import { Button, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import Spinner from "../../components/Spinner";
import {
  deleteProduct,
  getAllProducts,
} from "../../redux/features/product/productSlice";
import AdminHeader from "../components/AdminHeader";
import { AdminProductsColumn } from "../components/MUI_Column";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts());
    // eslint-disable-next-line
  }, []);

  const handleDelete = (props) => {
    dispatch(deleteProduct(props));
  };

  const confirmDelete = (id) => {
    swal({
      text: "Are you sure want to delete this product?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(id);
      } else {
      }
    });
  };

  const rows = products?.map((product, index) => {
    return {
      id: product?._id,
      slNo: index + 1,
      productImage: product.img?.url,
      productImageId: product.img?.publicid,
      productName: product.name,
      productUrl: product.productUrl,
      productCode: product.productCode,
      category: product._category?.name,
      quantity: product.quantity,
      price: product.price,
      discount: product?.discount,
      delete: confirmDelete,
    };
  });

  return (
    <>
      <AdminHeader />
      <Container>
        <div className="add-product">
          <Link to="/admin/products/create" className="add-product-link">
            <Button
              variant="contained"
              style={{ textTransform: "none", backgroundColor: "#18a753" }}
            >
              <GoPlus />
              Add Product
            </Button>
          </Link>
        </div>
        <div className="box">
          <Box
            sx={{
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#18a753",
                color: "white",
              },
            }}
            className="box"
          >
            <DataGrid
              rows={rows}
              columns={AdminProductsColumn}
              pageSize={20}
              rowsPerPageOptions={[20]}
              disableSelectionOnClick
              autoHeight
              components={{
                LoadingOverlay: LinearProgress,
              }}
              getRowId={(row) => row?.id}
              loading={loading}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </div>
        {loading && <Spinner />}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 20px;
  .add-product {
    text-align: right;
  }
  .add-product-link {
    text-decoration: none;
  }
  .box {
    margin-top: 20px;
  }
  .product {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    color: inherit;
  }
  .product > img {
    width: 50px;
    height: 40px;
  }
  .product > p {
    font-size: 14px;
    margin-left: 5px;
  }
  .inStock {
    color: green;
  }
  .outOfStock {
    color: red;
  }
  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .view {
    color: #2196f3;
    margin-right: 6px;
    font-size: 24px;
  }
  .edit {
    color: green;
    margin-right: 6px;
    font-size: 20px;
  }
  .delete {
    color: red;
    font-size: 20px;
  }
`;

export default AdminProducts;
