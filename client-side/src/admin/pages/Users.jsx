import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import swal from "sweetalert";
import Spinner from "../../components/Spinner";
import { deleteUser, getAllUsers } from "../../redux/features/auth/userSlice";
import AdminHeader from "../components/AdminHeader";
import { usersColumns } from "../components/MUI_Column";

const Users = () => {
  const dispatch = useDispatch();
  const { pending, users } = useSelector((state) => state.user);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
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

  const row = users.map((user, index) => {
    return {
      id: user._id,
      slNo: index + 1,
      name: user.name,
      email: user.email,
      status: user.status,
      delete: confirmDelete
    };
  });

  useEffect(() => {
    dispatch(getAllUsers());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AdminHeader />
      <Container>
        <h3 className="header">All Users</h3>
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
            rows={row}
            columns={usersColumns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            autoHeight
            components={{
              LoadingOverlay: LinearProgress,
            }}
            loading={pending}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        {pending && <Spinner />}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 20px 30px;
  .header {
    display: table;
    margin: 0 auto;
    border-bottom: 2px solid green;
  }
  .box {
    margin-top: 30px;
  }
`;

export default Users;
