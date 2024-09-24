import React from "react";
import "./Nav.css";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";

function Nav() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar">
        {/* navlists */}
        {/* <ul className="nav-l">
          <li>Discover</li>
          <li>My Library</li>
          <li>Radio</li>
        </ul> */}

        <GrHomeRounded className="text-white font-bold text-[30px]  " />
        {/* search */}
        <div className="search">
          <span>
            <IoSearchSharp />
          </span>
          <input type="text" placeholder="Search Music" />
        </div>

        {/* login n dp */}
        <div className="profile">
          <button onClick={handleLogin}>Log In</button>
          <span className="navuser">
            <CgProfile />
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
