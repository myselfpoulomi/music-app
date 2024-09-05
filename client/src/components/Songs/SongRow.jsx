import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
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
    <div className=" w-[100%] p-[20px]">
      <div className="flex text-white justify-between items-center mb-[40px]">
      <h2 className="text-white text-4xl pl-[30px]">Songs</h2>
      <p className="flex gap-[20px] pr-[20px] text-lg">
        <FaArrowLeft />
        <FaArrowRight />
      </p>
      </div>
      <div className="flex gap-[0.1rem] pl-[40px] mt-[20px] h-[78%]">
        {songlist.map((items, index) => {
          return (
            <div className=" h-[280px] w-[280px] hover:bg-[rgba(31,18,18,0.252)] rounded-[10px] flex flex-col items-center justify-center  transition-all duration-700 ease-in-out hover:shadow-[rgba(0,0,0,0.3)]">
              <img
                className="h-[200px] w-[200px] object-cover rounded-[7px] mb-3 transform transition-transform duration-300 ease-in-out hover:scale-105"
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
