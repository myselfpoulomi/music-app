import React, { useState } from "react";
import "./Nav.css";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";

function Nav({ user }) {
  const [toggleUsername, setToggleUsername] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  function handleSearch(e) {
    const value = e.target.value;
    try {
    } catch (error) {}
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
          <input
            type="text"
            placeholder="Search Music"
            onChange={handleSearch}
          />
        </div>

        {/* login n dp */}
        <div className="profile">
          {user !== null ? (
            <button>Log Out</button>
          ) : (
            <button onClick={handleLogin}>Log In</button>
          )}

          <div className="navuser relative">
            <CgProfile
              onMouseEnter={() => {
                setToggleUsername(true);
              }}
              onMouseLeave={() => {
                setToggleUsername(false);
              }}
            />
            <p
              style={{ opacity: toggleUsername ? 1 : 0 }}
              className="transition-all ease-linear duration-200 pointer-events-none text-sm font-medium absolute top-[75%] text-center bg-black p-5 rounded-md  w-[100px] right-[2px] h-[4px] flex items-center justify-center "
            >
              {user !== null ? user.username : ""}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
