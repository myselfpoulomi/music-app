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
    { name: "Update Song", path: "/admin/update-song" },
  ]);

  return (
    <div className="h-[100vh] w-[100%] flex text-white font-serif">
      <div className="h-[100%] w-[20%] bg-[rgb(32,31,31)] border-r-slate-300 flex flex-col justify-between items-center p-[2rem]">
        <div className="">
          <h2 className="text-[40px]">Welcome Admin</h2>
          <div className="mt-[3rem] flex flex-col text-[30px] gap-[2rem] ">
            {navList.map((item, index) => {
              return (
                <p 
                className= "hover:text-gray-300 hover:cursor-pointer transition duration-300 ease-in-out"
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
        <button className="h-[50px] w-[50%] rounded-[10px] bg-red-500 text-lg transition duration-300 ease-in-out hover:bg-red-700 hover:text-white">
          Logout
        </button>
      </div>
      <div className="h-[100%] w-[80%] bg-[rgb(49,49,49)] text-white">
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
