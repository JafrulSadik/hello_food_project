import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Sidebar from "./admin/components/Sidebar";
import AddCategory from "./admin/pages/AddCategory";
import AddProduct from "./admin/pages/AddProduct";
import AddSlider from "./admin/pages/AddSlider";
import AdminCategory from "./admin/pages/AdminCategory";
import AdminProductDetail from "./admin/pages/AdminProductDetail";
import AdminProducts from "./admin/pages/AdminProducts";
import Dashboard from "./admin/pages/Dashboard";
import OrderDetail from "./admin/pages/OrderDetail";
import Orders from "./admin/pages/Orders";
import Sliders from "./admin/pages/Sliders";
import UpdateCategory from "./admin/pages/UpdateCategory";
import UpdateOrder from "./admin/pages/UpdateOrder";
import UpdateProduct from "./admin/pages/UpdateProduct";
import UpdateSlider from "./admin/pages/UpdateSlider";
import Users from "./admin/pages/Users";
import Account from "./pages/Account";
import AllProducts from "./pages/AllProducts";
import Billing from "./pages/Billing";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import MyReturns from "./pages/MyReturns";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Prodcuts from "./pages/Prodcuts";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import { setUser } from "./redux/features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AppContainer>
      <Routes>
        {/* User Route */}
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/all-products" element={<AllProducts />} />
        <Route path="/categories/:categoryUrl" element={<Prodcuts />} />
        <Route path="/product/:productUrl" element={<ProductDetail />} />
        <Route path="/account" element={user ? <Account /> : <Login />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-returns" element={<MyReturns />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        {/* Admin Route */}
        {user?.isAdmin ? (
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/:orderId" element={<OrderDetail />} />
            <Route
              path="/admin/orders/update/:orderId"
              element={<UpdateOrder />}
            />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/categories" element={<AdminCategory />} />
            <Route path="/admin/category/create" element={<AddCategory />} />
            <Route
              path="/admin/category/update/:categoryUrl"
              element={<UpdateCategory />}
            />
            <Route path="/admin/sliders" element={<Sliders />} />
            <Route path="/admin/sliders/create" element={<AddSlider />} />
            <Route path="/admin/slider/update/:id" element={<UpdateSlider />} />
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
        ) : (
          <Route element={<NotFound />} />
        )}
        {/* {error && <Route element={<NotFound />} />} */}
      </Routes>
      <ToastContainer hideProgressBar autoClose={1000} />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
`;

export default App;
