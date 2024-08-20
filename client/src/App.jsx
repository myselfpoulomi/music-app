import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ToastifyContainer from "./components/toastify/ToastifyContainer.jsx"

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/Cart" element={<Cart />} />
        <Route  path="/Login" element={<Login />}/>
      </Routes>

      <ToastifyContainer />
    </div>
  );
}

export default App;
