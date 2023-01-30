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
  deleteCategory,
  getAllCategories,
} from "../../redux/features/category/categorySlice";
import AdminHeader from "../components/AdminHeader";
import { AdminCategoriesColumn } from "../components/MUI_Column";

const AdminCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  //Get All Categories
  useEffect(() => {
    dispatch(getAllCategories());
    // eslint-disable-next-line
  }, []);

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
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

  const rows = categories?.map((category, index) => {
    return {
      id: category?._id,
      categoryUrl: category?.categoryUrl,
      publicid: category?.img?.publicid,
      slNo: index + 1,
      categoryImage: category.img?.url,
      categoryName: category.name,
      delete: confirmDelete,
    };
  });

  return (
    <>
      <AdminHeader />
      <Container>
        <div className="add-category">
          <Link to="/admin/category/create" className="add-category-link">
            <Button
              variant="contained"
              style={{ textTransform: "none", backgroundColor: "#18a753" }}
            >
              <GoPlus />
              Add Category
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
              columns={AdminCategoriesColumn}
              pageSize={20}
              rowsPerPageOptions={[20]}
              rowHeight={80}
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
  .add-category {
    text-align: right;
  }
  .add-category-link {
    text-decoration: none;
  }
  .box {
    margin-top: 20px;
  }
  .categoryColumn {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    color: inherit;
  }
  .categoryColumn > img {
    width: 100px;
    height: 80px;
  }
  .categoryColumn > p {
    font-size: 18px;
    margin-left: 20px;
  }
  .edit {
    color: green;
    margin-right: 10px;
    line-height: 0;
    font-size: 24px;
    text-decoration: none;
  }
  .delete {
    color: red;
    font-size: 24px;
    line-height: 0;
    text-decoration: none;
  }
`;

export default AdminCategories;
