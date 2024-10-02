import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";

function AlbumRow() {
  const [albumlist, setalbumlist] = useState([]);
  const navigate = useNavigate();
  const albumContainerRef = useRef(null);
  useEffect(() => {
    async function getAllAlbumbs() {
      try {
        const response = await axios.get("http://localhost:5100/getallalbums");
        setalbumlist(response.data.albumList);
        console.log(response.data);
      } catch (error) {
        console.log("Error while fetching album list : ", error);
      }
    }
    getAllAlbumbs();
  }, []);

  function scrollRight() {
    if (albumContainerRef.current) {
      albumContainerRef.current.scrollTo({
        left: albumContainerRef.current.scrollLeft + 300,
        behavior: "smooth"
      });
    }
  }
  function scrollLeft() {
    if (albumContainerRef.current) {
      albumContainerRef.current.scrollTo({
        left: albumContainerRef.current.scrollLeft - 300,
        behavior: "smooth"
      });
    }
  }
  function handleClickAlbum(id) {
    navigate(`/album/${id}`);
  }

  return (
    <div className="w-[100%]">
      <div className="flex text-white justify-between items-center">
        <h2 className="text-white text-[30px] pl-[30px] font-[500]">Popular Albums</h2>
        <p className="flex gap-[20px] pr-[20px] text-lg">
          <FaArrowLeft className="cursor-pointer" onClick={scrollLeft} />
          <FaArrowRight className="cursor-pointer" onClick={scrollRight} />
        </p>
      </div>
      <div
        ref={albumContainerRef}
        className="overflow-x-auto scrollNone transition-all ease-linear duration-200"
      >
        <div className="flex gap-0 pl-[40px] mt-[10px] h-[78%]">
          {albumlist.map((items, index) => {
            return (
              <div
                key={index}
                className="h-[300px] min-w-[230px] hover:bg-[rgba(5,5,5,0.227)] rounded-[10px] flex flex-col items-center py-4 px-2 transition-all  hover:shadow-[rgba(0,0,0,0.3)] relative"
                onClick={() => handleClickAlbum(items._id)
                
                }
              >
                
                <img
                  className="h-[210px] w-[210px] object-cover rounded-[7px] mb-3 transform transition-transform duration-100 ease-in-out hover:scale-100 "
                  src={items.image}
                  alt=""
                />
                  <FaCirclePlay className="h-[50px] w-[50px] absolute    z-1 bottom-2 right-2  transition-transform duration-150 ease-in-out hover:scale-110 text-[20px] text-teal-700  rounded-full bg-black" 
                  style={{ top: '65%', left: '80%', transform: 'translate(-50%, -50%)' }}/>
                <p className="text-white text-[20px] text-center mt-[3px] mb-10">
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

export default AlbumRow;
