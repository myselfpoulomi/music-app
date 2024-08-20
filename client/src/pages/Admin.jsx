import React, { useState } from "react";
import "../components/admin/Admin.css";
import { useNavigate , Routes , Route } from "react-router-dom";
import AddArtist from "../components/admin/AddArtist";
import UpdateArtist from "../components/admin/UpdateArtist";
import AddAlbum from "../components/admin/AddAlbum";
import UpdateAlbum from "../components/admin/UpdateAlbum";
import AddSong from "../components/admin/AddSong";
import UpdateSong from "../components/admin/UpdateSong";

function Admin() {
  const navigate = useNavigate();
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
          <h2>Welcome Admin</h2>
          <div className="adminList">
            {navList.map((item, index) => {
              return (
                <p
                key={index}
                  onClick={()=> {
                    navigate(item.path)
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
        <Route path="/add-artist" element={<AddArtist />} />
        <Route path="/update-artist" element={<UpdateArtist />} />
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
