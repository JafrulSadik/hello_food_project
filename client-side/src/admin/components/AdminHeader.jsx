import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminHeader = () => {
  return (
    <HeaderContainer>
      <div className="left">
        Welcome, <span>Hello Food</span> Admin
      </div>
      <div className="right">
        <Link className="logoutBtn">
          <Button
            variant="contained"
            color="error"
            style={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Link>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid lightgray;
  .left > span {
    color: green;
    font-weight: 600;
  }
  .logoutBtn {
    text-decoration: none;
  }
`;

export default AdminHeader;
