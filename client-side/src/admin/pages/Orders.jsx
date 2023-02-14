import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getOrderProducts } from "../../redux/features/order/orderSlice";
import { ordersColumns } from "../components/MUI_Column";

const Orders = () => {
  const dispatch = useDispatch();
  const { orderProducts, loading } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrderProducts());
    // eslint-disable-next-line
  }, []);

  const rows = orderProducts.map((item, index) => {
    console.log(item);
    return {
      id: item?._id,
      slNo: index + 1,
      productImage: item.img?.url,
      productImageId: item.img?.publicid,
      productName: item.name,
      productUrl: item.productUrl,
      productCode: item.productCode,
      category: item._category?.name,
      quantity: item.quantity,
      price: item.price,
      discount: item?.discount,
    };
  });

  return (
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
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Container>
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
`;

export default Orders;
