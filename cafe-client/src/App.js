import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/reducers/globalSlice";

import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import PrivateRoute from "./components/PrivateRoute";
import AddProduct from "./pages/AddProduct";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, loggedIn } = useSelector((state) => state.global);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav style={{ padding: "10px", background: "#f7f7f7" }}>
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
        <Link to="/register" style={{ margin: "10px" }}>Register</Link>
        <Link to="/products" style={{ margin: "10px" }}>Products</Link>
        <Link to="/cart" style={{ margin: "10px" }}>Cart</Link>
        <Link to="/orders" style={{ margin: "10px" }}>Comenzile mele</Link>
        {/* 🔹 doar adminul vede Add Product */}
  {role === "admin" && (
    <Link to="/add-product" style={{ margin: "10px", color: "#3e2723", fontWeight: "bold" }}>
      Add Product
    </Link>
  )}

        {loggedIn && (
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "20px",
              background: "#3b2a23",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/" element={<Product />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
