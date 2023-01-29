import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { logout } from "../../redux/features/auth/authSlice";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const { pending } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

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
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Link>
      </div>
      {pending && <Spinner />}
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
