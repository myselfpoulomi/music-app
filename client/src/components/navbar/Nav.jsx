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
  function handleSearch (e) {
      const value = e.target.value;
      try {
        
      } catch (error) {
        
      }
  }
  return (
    
    <div className="sticky top-0 bg-[rgb(24,23,23)] ">
      <nav className="navbar ">
        <GrHomeRounded
          className="text-white font-thin text-[30px] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        {/* search */}
        <div className="search">
          <span>
            <IoSearchSharp />
          </span>
          <input type="text" placeholder="Search Music" onChange={handleSearch} />
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
