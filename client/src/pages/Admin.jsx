import React, { useState } from "react";
import "../components/admin/Admin.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import MannageArtist from "../components/admin/Artist/MannageArtist";
import AddAlbum from "../components/admin/AddAlbum";
import UpdateAlbum from "../components/admin/UpdateAlbum";
import AddSong from "../components/admin/AddSong";
import UpdateSong from "../components/admin/UpdateSong";

function Admin() {
  const navigate = useNavigate();
  const [navList, setNavList] = useState([
    { name: "Mannage Artist", path: "/admin/mannage-artist" },
    { name: "Add Album", path: "/admin/add-album" },
    { name: "Update Album", path: "/admin/update-album" },
    { name: "Add Song", path: "/admin/add-song" },
    { name: "Update Song", path: "/admin/update-song" }
  ]);

  return (
    <div className="adminContanier">
      <div className="leftContainer">
        <div className="">
          <h2>Welcome Admin</h2>
          <div className="adminList">
            {navList.map((item, index) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
        <button className="logoutbtn">Logout</button>
      </div>
      <div className="rightContainer">
        <Routes>
          <Route path="/mannage-artist" element={<MannageArtist />} />
          <Route path="/add-album" element={<AddAlbum />} />
          <Route path="/update-album" element={<UpdateAlbum />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path="/update-song" element={<UpdateSong />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
