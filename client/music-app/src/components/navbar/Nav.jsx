import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <div className="nav-l">
            <li>Discover</li>
            <li>My Library</li>
            <li>Radio</li>
          </div>
        </ul>
        <div className="nav-r">
          <div className="search">
            <input type="text" placeholder="Search Music"/>
          </div>
          <div className="profile">
            <button>Log In</button>
            dp
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
