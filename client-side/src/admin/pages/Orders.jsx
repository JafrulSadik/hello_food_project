import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import styled from "styled-components";
import { ordersColumns } from "../components/MUI_Column";

const rows = [];

const Orders = () => {
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
