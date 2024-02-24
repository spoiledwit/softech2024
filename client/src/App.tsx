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

const App = () => {

  const { user, theme } = useAuthStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user ? <Home /> : <Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="item/:id" element={<Item />} />
        <Route path="forgot-password" element={<ForgotPass />} />
        <Route path="panel" element={<BusinessLayout />} />
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
