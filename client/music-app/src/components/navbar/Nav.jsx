import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <div>
      <nav className="navbar">
        {/* navlists */}
        <ul className="nav-l">
          <li>Discover</li>
          <li>My Library</li>
          <li>Radio</li>
        </ul>

        {/* search */}
        <div className="search">
          <input type="text" placeholder="Search Music" />
        </div>

        {/* login n dp */}
        <div className="profile">
          <button>Log In</button>
          <span className="navuser">dp</span>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

