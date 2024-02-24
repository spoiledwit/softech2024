import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./Layout";
import useAuthStore from "./store/authStore";
import ForgotPass from "./pages/ForgotPass";
import Item from "./pages/ItemPage";
import { useEffect } from "react";
import BusinessLayout from "./pages/Business/BusinessLayout";
import BusinessForm from "./pages/Business/BusinessForm";
import CartPage from "./pages/CartPage";
import Customers from "./pages/Business/Customers";
import Items from "./pages/Business/Items";
import CreateItem from "./pages/Business/CreateItem/CreateItem";
import CheckoutPage from "./pages/Checkout";
import ProfilePage from "./pages/Profile";
import Forums from "./pages/Forums/Forum";
import CreateForum from "./components/forum/CreateForum";
import ForumDetails from "./components/forum/ForumDetails";

const App = () => {
  const { user, theme } = useAuthStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user ? <Home /> : <Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="item/:id" element={<Item />} />
        <Route path="forgot-password" element={<ForgotPass />} />
        <Route path="forums" element={<Forums />} />
        <Route path="create-forum" element={<CreateForum />} />
        <Route path="forums/details/:id" element={<ForumDetails />} />
        <Route path="panel" element={<BusinessLayout />}>
          <Route path="customers" element={<Customers />} />
          <Route path="items" element={<Items />} />
          <Route path="create-item" element={<CreateItem />} />
        </Route>
        <Route path="business-form" element={<BusinessForm />} />
        <Route path="historical-sites" element={<Home />} />
        <Route path="natural-wonders" element={<Home />} />
        <Route path="cultural-attractions" element={<Home />} />
        <Route path="adventure-spots" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
