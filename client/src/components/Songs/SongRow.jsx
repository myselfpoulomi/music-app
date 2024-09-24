import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

function SongRow({ setcurSong }) {
  const [songlist, setsonglist] = useState([]);
  const SongContainerRef = useRef(null);
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

  function scrollRight() {
    if (SongContainerRef.current) {
      SongContainerRef.current.scrollTo({
        left: SongContainerRef.current.scrollLeft + 300,
        behavior: "smooth"
      });
    }
  }
  function scrollLeft() {
    if (SongContainerRef.current) {
      SongContainerRef.current.scrollTo({
        left: SongContainerRef.current.scrollLeft - 300,
        behavior: "smooth"
      });
    }
  }

  function handleClickSongs(song) {
    console.log(song);
    setcurSong(song.song);
  }

  return (
    <div className=" w-[100%]">
      <div className="flex text-white justify-between items-center ">
        <h2 className="text-white text-[30px] pl-[30px] font-[500]">Songs</h2>
        <p className="flex gap-[20px] pr-[20px] text-lg">
          <FaArrowLeft className="cursor-pointer" onClick={scrollLeft} />
          <FaArrowRight className="cursor-pointer" onClick={scrollRight} />
        </p>
      </div>
      <div
        ref={SongContainerRef}
        className="overflow-x-auto scrollNone transition-all ease-linear duration-200"
      >
        <div className="flex gap-[0.1rem] pl-[40px] mt-[20px] h-[78%] ">
          {songlist.map((items, index) => {
            return (
              <div
                key={index}
                className=" h-[240px] min-w-[210px] hover:bg-[rgba(31,18,18,0.252)] rounded-[10px] flex flex-col items-center justify-center  transition-all duration-700 ease-in-out hover:shadow-[rgba(0,0,0,0.3)]"
                onClick={() => {
                  handleClickSongs(items);
                }}
              >
                <img
                  className="h-[170px] w-[170px] object-cover rounded-[7px] mb-3 transform transition-transform duration-200 ease-in-out hover:scale-105"
                  src={items.image}
                  alt=""
                />
                <p className="text-white text-[17px] text-center mt-[3px]">
                  {items.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SongRow;
