import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";

function App() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="containermain select-none">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/login" element={<Login setuser={setuser} />} />
      </Routes>
      <ToastContainer position="top-left" />
    </div>
  );
}

export default App;
