import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { loginUser } from "../redux/features/auth/authSlice";
import { mobile } from "../responsive";

const Login = () => {
  // const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { pending, error, userInfo } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="wrapper">
          <form className="loginForm">
            <h1>Login</h1>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <span>{error.message}</span>}
            <Link className="forgot_password" to="/login">
              Forgot Password?
            </Link>
            <button onClick={handleLogin}>Login</button>
            <div className="signup">
              <p>
                Don't have an account?{" "}
                <Link className="signup_link" to="/register">
                  SignUp
                </Link>{" "}
              </p>
              {/* <p>Or Login Using</p> */}
            </div>
            {/* <div className="icons">
              <a href="/">
                <FontAwesomeIcon className="facebook" icon={faFacebookF} />
              </a>
              <a href="/">
                <FontAwesomeIcon className="google" icon={faGoogle} />
              </a>
            </div> */}
          </form>
        </div>
      </Container>
      {pending && <Spinner />}
      {userInfo && <Navigate to="/" replace="true" />}
      <MobileMenu />
      <Footer />
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginForm {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #fff;
    width: 30%;
    box-shadow: 0 0px 12px rgba(0, 0, 0, 0.055);
    border-radius: 10px;
    padding: 30px;
    margin: 50px 0;
    border: 1px solid #a19c9c49;
    ${mobile({
      width: "70%",
    })}
  }
  .loginForm h1 {
    text-align: center;
    margin: 20 0;
    padding: 10px;
  }
  .loginForm label {
    font-size: 15px;
  }
  .loginForm input {
    font-size: 14px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 8px 8px;
    outline: none;
    &:active {
      outline: #10918a;
    }
  }
  .loginForm > a {
    font-size: 12px;
    color: #01936c;
  }
  .loginForm > .signup {
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px 0;
  }

  .loginForm button {
    padding: 8px 0;
    background-color: #01936c;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
      background-color: #077558;
    }
  }
  .loginForm > span {
    font-size: 14px;
    color: red;
  }
  .signup > p {
    font-size: 15px;
  }
  .signup_link {
    text-decoration: none;
    color: #01936c;
  }
  .icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .icons a {
    text-decoration: none;
    cursor: pointer;
    position: relative;
    top: 0;
    &:hover {
      top: -2px;
      transition: 0.3s;
    }
  }
  .icons .facebook {
    border-radius: 50%;
    background: #3b5998;
    color: white;
    padding: 10px 13px;
  }
  .icons .google {
    border-radius: 50%;
    background: #e62833;
    color: white;
    padding: 10px;
  }
`;

export default Login;
