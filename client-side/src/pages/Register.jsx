import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { createUser } from "../redux/features/auth/authSlice";

import { mobile } from "../responsive";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailfocused, setEmailFocused] = useState(false);
  const [passwordfocused, setPasswordFocused] = useState(false);
  const [confirmpasswordfocused, setConfirmPasswordFocused] = useState(false);
  const dispatch = useDispatch();
  const { error, pending, userInfo } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ name, email, password }));
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="wrapper">
          <form className="loginForm" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onBlur={() => setEmailFocused(true)}
              emailfocused={emailfocused.toString()}
              onChange={(e) => setEamil(e.target.value)}
              required
            />
            <span className="email_span">
              Please provide a valid email address
            </span>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onBlur={() => setPasswordFocused(true)}
              passwordfocused={passwordfocused.toString()}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^.{6,}$"
              placeholder="Password"
              required
            />
            <span className="password_span">
              Password should be at least 6 characters
            </span>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              pattern={password}
              confirmpasswordfocused={confirmpasswordfocused.toString()}
              onBlur={() => setConfirmPasswordFocused(true)}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="confirm_span">Password doesn't match</span>
            {error && <p className="error_text">{error.message}</p>}
            {userInfo && <Navigate to="/" replace="true" />}
            <button type="submit">Register</button>
            <p>Or Join with</p>
            <div className="icons">
              <a href="/">
                <FontAwesomeIcon className="facebook" icon={faFacebookF} />
              </a>
              <a href="/">
                <FontAwesomeIcon className="google" icon={faGoogle} />
              </a>
            </div>
          </form>
        </div>
      </Container>
      {pending && <Spinner />}
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
  .loginForm h2 {
    text-align: center;
    margin: 20 0;
    padding: 10px;
  }
  .loginForm label {
    font-size: 18px;
  }
  input {
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
    font-size: 15px;
    color: black;
  }
  .loginForm p {
    text-align: center;
    margin: 10px 0;
  }
  .loginForm > button {
    padding: 8px 0;
    background-color: #01936c;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
  }
  .loginForm > span {
    font-size: 12px;
    padding: 3px;
    color: red;
    display: none;
  }
  input:invalid[emailfocused="true"] ~ .email_span {
    display: block;
  }
  input:invalid[passwordfocused="true"] ~ .password_span {
    display: block;
  }
  input:invalid[confirmpasswordfocused="true"] ~ .confirm_span {
    display: block;
  }
  .loginForm > .error_text {
    color: red;
    display: block;
    font-size: 14px;
    font-weight: 400;
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

export default Register;
