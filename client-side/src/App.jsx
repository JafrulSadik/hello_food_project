import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Sidebar from "./admin/components/Sidebar";
import AddProduct from "./admin/pages/AddProduct";
import AdminCategory from "./admin/pages/AdminCategory";
import AdminProductDetail from "./admin/pages/AdminProductDetail";
import AdminProducts from "./admin/pages/AdminProducts";
import Dashboard from "./admin/pages/Dashboard";
import Orders from "./admin/pages/Orders";
import Slider from "./admin/pages/Slider";
import UpdateProduct from "./admin/pages/UpdateProduct";
import Users from "./admin/pages/Users";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import MyReturns from "./pages/MyReturns";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Prodcuts from "./pages/Prodcuts";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import { setUser } from "./redux/features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state.product);
  const AdminLayout = ({ children }) => (
    <>
      <Sidebar>
        {children}
        <Outlet />
      </Sidebar>
    </>
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line
  }, []);
  return (
    <AppContainer>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories/:products" element={<Prodcuts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-returns" element={<MyReturns />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/slider" element={<Slider />} />
          <Route path="/admin/products/create" element={<AddProduct />} />
          <Route
            path="/admin/product/update/:productUrl"
            element={<UpdateProduct />}
          />
          <Route
            path="/admin/product/:productUrl"
            element={<AdminProductDetail />}
          />
        </Route>
        {/* {error && <Route element={<NotFound />} />} */}
      </Routes>
      <ToastContainer />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
`;

export default App;
