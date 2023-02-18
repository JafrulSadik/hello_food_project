import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgLogIn, CgLogOut, CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/hello_food.png";
import { logout } from "../redux/features/auth/authSlice";
import {
  getCartProducts,
  get_Cart_Products,
} from "../redux/features/cart/cartSlice";
import { getAllProducts } from "../redux/features/product/productSlice";

import { tablet } from "../responsive";
import Spinner from "./Spinner";

// ************ Navbar Design ************ //

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  align-items: center;
  padding: 0px 10%;
  background-color: white;
  height: 85px;
  box-shadow: 0 -1px 10px rgba(59, 59, 59, 0.111);
  text-align: center;
  z-index: 10;

  ${tablet({
    height: "65px",
    "justify-content": "space-around",
  })}
`;

const Logo = styled.div`
  flex: 1;
  text-align: start;

  ${tablet({
    height: "70px",
    display: "flex",
    "align-items": "center",
  })}
`;

const LogoImage = styled.img`
  height: 50px;
  width: 90px;

  ${tablet({
    height: "40px",
    width: "60px",
  })}
`;
const Form = styled.form`
  background-color: white;
  width: 100%;
  height: 100%;
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;

  ${tablet({
    display: "none",
  })}
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border: 1px solid #3bb77e;
  border-right: none;
  background-color: white;
  border-radius: 10px;
`;
const Icon = styled.p`
  color: #7e7f82;
  font-size: 1.2em;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding-left: 5px;
  outline: none;
  color: gray;
  font-size: 14px;
  height: 100%;
`;
const NavButton = styled.button`
  width: 140px;
  height: 40px;
  background-color: #01936c;
  color: white;
  border: none;
  border-radius: 0px 8px 8px 0px;
  font-size: 15px;
  &:hover {
    background-color: #1f935d;
    color: white;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const NavDiv = styled.div`
  width: 100%;
  height: 100%;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  ${tablet({
    flex: "1",
    gap: "10px",
    "justify-content": "flex-end",
  })}
`;

const LinkPc = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 14px;
  background-color: #f6f6f6;
  border-radius: 5px;
  color: #7e7f82;
  &:hover {
    background-color: #3bb77e;
    color: white;
    transition: 0.5s;
    cursor: pointer;
  }

  /* ${tablet({
    padding: "7px 10px",
    gap: "4px",
  })} */

  ${tablet({
    display: "none",
  })}
`;

const MyAccount = styled.div``;

const AccountBtn = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  padding: 10px 15px;
  font-size: 14px;
  background-color: #f6f6f6;
  border-radius: 5px;
  color: #7e7f82;
  &:hover {
    background-color: #3bb77e;
    color: white;
    transition: 0.5s;
    cursor: pointer;
  }

  ${tablet({
    display: "none",
  })}
`;

const LinkLogin = styled(Link)`
  display: none;
  gap: 8px;
  align-items: center;
  padding: 10px 15px;
  font-size: 14px;
  background-color: #f6f6f6;
  border-radius: 5px;
  color: #7e7f82;
  text-decoration: none;

  &:hover {
    background-color: #3bb77e;
    color: white;
    transition: 0.5s;
    cursor: pointer;
  }

  ${tablet({
    display: "flex",
    padding: "7px 10px",
    gap: "4px",
    alignItems: "center",
  })}
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const Text = styled.p`
  ${tablet({
    "font-size": "12px",
  })}
`;
const Span = styled.span`
  font-size: 1.2em;
  margin-top: 5px;

  ${tablet({
    "font-size": "0.8rem",
    "margin-top": "3px",
  })}
`;

const SubMenu = styled.div`
  position: absolute;
  top: 74px;
  right: 12.5%;
  color: gray;
  background-color: white;
  border: 1px solid #c6c6c6ac;
  border-radius: 4px;
  font-size: 14px;
  text-align: start;
  width: 170px;
`;
const ListOption = styled.ul``;
const Option = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
`;
const OptionLink = styled(Link)`
  padding: 10px 15px;
  text-decoration: none;
  color: gray;
  cursor: pointer;
  &:hover {
    background-color: #3bb77e;
    color: white;
  }
`;

const CartDiv = styled.div`
  position: relative;
  .quantityDiv {
    background-color: #01936c;
    color: white;
    padding: 0 4px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    right: -11px;
  }
`;

const Navbar = () => {
  const [active, setActive] = useState({ display: "none" });
  const [searchInput, setSearchInput] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const { cartProducts } = useSelector((state) => state.cart);
  const { userInfo, pending } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userInfo?.name) {
      dispatch(getCartProducts(userInfo?._id));
    } else {
      dispatch(get_Cart_Products());
    }
    //eslint-disable-next-line
  }, [userInfo]);

  useEffect(() => {
    const filteredProducts = products?.filter((product) =>
      product?.name?.toLowerCase().includes(searchInput?.toLowerCase())
    );
    setSearchProducts(filteredProducts);
    if (searchInput === "") {
      setSearchProducts([]);
    }
    //eslint-disable-next-line
  }, [searchInput]);

  const handleAccountClick = (e) => {
    e.preventDefault();
    if (active.display === "none") {
      setActive({ display: "block" });
    } else {
      setActive({ display: "none" });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(navigate));
    // navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?text=${searchInput}`);
  };

  return (
    <MainWrapper>
      <Wrapper>
        <Logo>
          <LogoLink to="/">
            <LogoImage src={logo} />
          </LogoLink>
        </Logo>

        <Form>
          <InputDiv>
            <Icon>
              <BiSearch></BiSearch>
            </Icon>
            <SearchInput
              onChange={(e) => setSearchInput(e.target.value)}
            ></SearchInput>
            <div className="search-div">
              {searchProducts && (
                <div className={`search-result`}>
                  {searchProducts?.map((item) => {
                    const modifiedName =
                      item?.name?.length > 50
                        ? item?.name?.trim().substr(0, 42) + "..."
                        : item?.name;
                    return (
                      <div className="link-div" key={item?._id}>
                        <img src={item?.img?.url} alt="" />
                        <Link
                          className="temp-result-link"
                          to={`/product/${item?.productUrl}`}
                        >
                          {modifiedName}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <NavButton onClick={(e) => handleSearch(e)}>Search</NavButton>
          </InputDiv>
        </Form>

        <NavDiv>
          <LinkPc to="/cart">
            <CartDiv>
              <FaShoppingCart style={{ fontSize: "18px" }}></FaShoppingCart>
              <div className="quantityDiv">
                <p>{cartProducts?.length}</p>
              </div>
            </CartDiv>
            <Text>Cart</Text>
          </LinkPc>
          <MyAccount onClick={(e) => handleAccountClick(e)}>
            <AccountBtn>
              <Span>
                <CgProfile />
              </Span>
              {}
              <Text>{userInfo ? userInfo?.name : "My Account"}</Text>
            </AccountBtn>

            <SubMenu style={active} onClick={(e) => handleAccountClick(e)}>
              <ListOption>
                <Option>
                  {userInfo ? (
                    <>
                      <OptionLink to="/account">{userInfo.name}</OptionLink>
                      {userInfo.isAdmin && (
                        <OptionLink to="/admin">My Admin</OptionLink>
                      )}
                      <OptionLink onClick={handleLogout}>Logout</OptionLink>
                    </>
                  ) : (
                    <>
                      <OptionLink to="/login">Login</OptionLink>
                      <OptionLink to="/register">Register</OptionLink>
                    </>
                  )}
                </Option>
              </ListOption>
            </SubMenu>
          </MyAccount>

          {userInfo ? (
            <LinkLogin to="/">
              <Span>
                <CgLogOut />
              </Span>
              <Text onClick={handleLogout}>Logout</Text>
            </LinkLogin>
          ) : (
            <LinkLogin to="/login">
              <Span>
                <CgLogIn />
              </Span>
              <Text>Login</Text>
            </LinkLogin>
          )}
        </NavDiv>
        {pending && <Spinner />}
      </Wrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  .search-div {
  }
  .search-result {
    position: absolute;
    z-index: 999999;
    width: 45%;
    top: 74px;
    left: 21.5%;
    right: 25%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.089), 0 3px 6px rgba(0, 0, 0, 0.11);
  }
  .display-products {
    display: none;
  }
  .link-div {
    padding: 12px 15px;
    /* border-bottom: 1px solid lightgray; */
    display: flex;
    align-items: center;
  }

  .link-div > img {
    display: flex;
    align-items: center;
    width: 40px;
    /* border: 1px solid red; */
    margin-right: 10px;
  }
  .temp-result-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: gray;
    /* border: 1px solid blue; */
  }
`;

export default Navbar;

// {searchProducts?.map((item) => {
//   return (
//     <Link className="temp-result-link">{item?.name}</Link>
//   );
// })}
