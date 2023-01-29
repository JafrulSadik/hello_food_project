import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../images/hello_food.png";
import { sidebarItems } from "../AdminData";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation().pathname.split("/").pop();
  const [active, setActive] = useState(0);

  const value = [
    "admin",
    "products",
    "users",
    "orders",
    "categories",
    "sliders",
  ].indexOf(location);

  useEffect(() => {
    setActive(value);
    // eslint-disable-next-line
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarContainer>
        <div style={{ width: isOpen ? "250px" : "80px" }} className="sidenav">
          <div className="top">
            <Link
              className="admin-page-logo"
              to="/"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <img src={logo} alt="logo" className="slider-logo" />
            </Link>
            <div
              className="hamburgerDiv"
              style={{ marginLeft: isOpen ? "120px" : "0" }}
            >
              <GiHamburgerMenu className="hamburger" onClick={toggle} />
            </div>
          </div>
          {sidebarItems.map((item, index) => (
            <Link
              className={index === active ? "anchor active" : "anchor"}
              to={item.path}
              style={{
                justifyContent: !isOpen ? "center" : "flex-start",
                paddingLeft: !isOpen && "12px",
              }}
              key={index}
              onClick={() => setActive(index)}
            >
              <div className="icon">{item.icon}</div>
              {isOpen && <div className="title">{item.title}</div>}
            </Link>
          ))}
        </div>
        <main
          style={{
            paddingLeft: isOpen ? "250px" : "80px",
            transition: "all .5s",
          }}
          className="maindiv"
        >
          {children}
        </main>
      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled.div`
  .sidenav {
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    /* background-color: #1f1a1a; */
    background-color: #eaeaf1;
    overflow-x: hidden;
    transition: 0.5s;
  }

  .top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 20px;
    height: 60px;
  }

  .admin-page-logo > img {
    height: 50px;
    width: 80px;
  }

  .admin-page-logo > .slider-logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidenav > .anchor {
    padding: 12px;
    padding-left: 18px;
    text-decoration: none;
    font-size: 20px;
    color: #3b3737;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.3s;
  }

  .anchor > .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidenav > .active {
    background-color: #18a753;
    display: flex;
    color: white;
    &:hover {
      color: white !important;
    }
  }

  .sidenav > .anchor:hover {
    color: black;
  }

  .hamburgerDiv {
    transition: margin-left 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hamburger {
    color: black;
    cursor: pointer;
    font-size: 25px;
  }
`;

export default Sidebar;
