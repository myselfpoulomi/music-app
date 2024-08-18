import React, { useState } from "react";
import "../components/admin/Admin.css";

function Admin() {
  const [navList, setNavList] = useState([
    { name: "Add Artist", path: "/admin/add-artist" },
    { name: "Update Artist", path: "/admin/update-artist" },
    { name: "Add Album", path: "/admin/add-album" },
    { name: "Update Album", path: "/admin/update-album" },
    { name: "Add Song", path: "/admin/add-song" },
    { name: "Update Song", path: "/admin/update-song" },
  ]);

  return (
    <div className="adminContanier">
      <div className="leftContainer">
        <div className="">
          <h3>Welcome Admin</h3>
          <div className="adminList">
            {navList.map((item, index) => {
              console.log(item);
              return <p>{item.name}</p>;
            })}
          </div>
        </div>
        <button className="logoutbtn">Logout</button>
      </div>
      <div className="rightContainer"></div>
    </div>
  );
}

export default Admin;
