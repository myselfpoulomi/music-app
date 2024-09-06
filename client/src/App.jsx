import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="containermain select-none">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        {/* <Route path="/Cart" element={<Cart />} />
        <Route  path="/Login" element={<Login />}/> */}
      </Routes>

      <ToastContainer position="top-left" />
      
    </div>
  );
}

export default App;
