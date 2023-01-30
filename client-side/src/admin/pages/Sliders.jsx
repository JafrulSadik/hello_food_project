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
  deleteSlider,
  getAllSliders,
} from "../../redux/features/slider/sliderSlice";
import AdminHeader from "../components/AdminHeader";
import { SlidersColumn } from "../components/MUI_Column";

const Sliders = () => {
  const dispatch = useDispatch();
  const { sliders, loading } = useSelector((state) => state.slider);

  //Get All Categories
  useEffect(() => {
    dispatch(getAllSliders());
    // eslint-disable-next-line
  }, []);

  const handleDelete = (sliderId) => {
    dispatch(deleteSlider(sliderId));
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

  const rows = sliders?.map((slider, index) => {
    return {
      id: slider?._id,
      slNo: index + 1,
      sliderImage: slider.img?.url,
      sliderName: slider.name,
      delete: confirmDelete,
    };
  });

  return (
    <>
      <AdminHeader />
      <Container>
        <div className="add-slider">
          <Link to="/admin/sliders/create" className="add-slider-link">
            <Button
              variant="contained"
              style={{ textTransform: "none", backgroundColor: "#18a753" }}
            >
              <GoPlus />
              Add Slider
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
              columns={SlidersColumn}
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
  .add-slider {
    text-align: right;
  }
  .add-slider-link {
    text-decoration: none;
  }
  .box {
    margin-top: 20px;
  }
  .sliderName {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    color: inherit;
  }
  .sliderName > img {
    width: 50px;
    height: 40px;
  }
  .sliderName > p {
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

export default Sliders;
