import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Orders from "./pages/Orders";



function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#f7f7f7" }}>
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
        <Link to="/products" style={{ margin: "10px" }}>Products</Link>
        <Link to="/cart" style={{ margin: "10px" }}>Cart</Link>
        <Link to="/orders" style={{ margin: "10px" }}>Comenzile mele</Link>
        <Link to="/register" style={{ margin: "10px" }}>Register</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
