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
import axios from "axios";

function App() {
  const [user, setuser] = useState(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(
          "http://localhost:5100/user/get-user",
          {
            withCredentials: true
          }
        );
        setuser(data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="containermain select-none">
      <Routes>
        <Route path="/*" element={<Home user={user} />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/login" element={<Login setuser={setuser} />} />
      </Routes>
      <ToastContainer position="top-left" />
    </div>
  );
}

export default App;
