import React from "react";

import axios from "axios";
import { useState } from "react";

function AlbumList({
  title,
  image,
  id,
  setcurAlbum,
  settoggle
//   settoggleInputs,
//   setsetidtoupdate
}) {
  const handleDeleteAlbum = async () => {
    try {
      const Response = await axios.delete(
        `http://localhost:5100/admin/deletealbum/${id}`
      );
      console.log(Response);
      if (Response.status == 200) {
        alert("Album Deleted Sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[300px] flex flex-col items-center justify-center">
      <div className=" w-[300px]  flex flex-col items-center">
        <img
          className="h-[370px] w-[300px] object-cover rounded-lg"
          src={image}
          alt=""
        />
        <h3 className="mt-[10px] text-[20px] font-bold">{title}</h3>

        
      </div>
      <div className="mt-[10px] flex h-[50px] w-[300px] gap-3">
        <button
          className="bg-emerald-500 p-2 w-[50%] rounded-lg text-[20px] hover:bg-emerald-700 transition-all ease-linear duration-200"
            onClick={()=>{
                setcurAlbum(id);
                settoggle(true);
            }}
        >
          Update
        </button>
        <button
          className="bg-red-400 p-2 w-[50%] rounded-lg  text-[20px] hover:bg-red-500 transition-all ease-linear duration-200"
          onClick={handleDeleteAlbum}
          
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AlbumList;
