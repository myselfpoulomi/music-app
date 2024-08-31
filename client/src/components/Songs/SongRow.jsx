import React, { useEffect, useState } from "react";

import axios from "axios";

function SongRow() {
  const [songlist, setsonglist] = useState([]);
  useEffect(() => {
    async function getAllSongs() {
      try {
        const response = await axios.get("http://localhost:5100/getallsongs");
        setsonglist(response.data.songs);
      } catch (error) {
        console.log("Error while fetching song list : ", error);
      }
    }
    getAllSongs();
  }, []);
      
  return (
    <div className="  p-[1rem] px-[3rem]">
      <h2 className="text-white text-[35px] mb-9 ">Songs</h2>
      <div className="flex gap-[2rem]">
        {songlist.map((items, index) => {
          return (
            <div>
              <img
                className="h-[210px] w-[210px] object-cover rounded-[7px] mb-8 "
                src={items.image}
                alt=""
              />
              <p className="text-white text-[20px] text-center mt-[5px]">
                {items.title} 
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongRow;
