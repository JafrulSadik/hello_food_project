import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { getOrderProducts } from "../../redux/features/order/orderSlice";
import AdminHeader from "../components/AdminHeader";
import { ordersColumns } from "../components/MUI_Column";

const Orders = () => {
  const dispatch = useDispatch();
  const { orderProducts, loading } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrderProducts());
    // eslint-disable-next-line
  }, []);

  const rows = orderProducts?.map((item, index) => {
    const dateFromDB = item?.createdAt;
    const formattedDate = moment(dateFromDB).format("DD/MM/YY");
    return {
      id: item?._id,
      slNo: index + 1,
      date: formattedDate,
      price: item?.totalPrice,
      payment: item?.paymentMethod,
      deliveryStatus: item?.deliveryStatus,
    };
  });

  return (
    <>
      <AdminHeader />
      <Container>
        <h3 className="header">All Orders</h3>
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
            columns={ordersColumns}
            initialState={{
              sorting: {
                sortModel: [{ field: "slNo", sort: "desc" }],
              },
            }}
            pageSize={20}
            rowsPerPageOptions={[20]}
            rowHeight={60}
            autoHeight
            components={{
              LoadingOverlay: LinearProgress,
            }}
            loading={loading}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        {loading && <Spinner />}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 20px 10px;
  .header {
    display: table;
    margin: 0 auto;
    border-bottom: 2px solid green;
  }
  .box {
    margin-top: 20px;
  }
  .orderNo {
    text-decoration: none;
    color: green;
  }
  .view {
    line-height: 0;
    text-decoration: none;
    margin-right: 10px;
  }
  .view > button {
    background-color: transparent;
    border: none;
    font-size: 15px;
    color: green;
    cursor: pointer;
  }
  .edit {
    line-height: 0;
    text-decoration: none;
  }
  .edit > button {
    background-color: transparent;
    border: none;
    font-size: 15px;
    color: #3d8bd9;
    cursor: pointer;
  }
`;

export default Orders;
