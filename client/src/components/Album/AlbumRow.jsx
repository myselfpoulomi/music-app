import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import { FaArrowLeft } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import AlbumCard from "./AlbumCard";

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

  // function scrollRight() {
  //   if (albumContainerRef.current) {
  //     albumContainerRef.current.scrollTo({
  //       left: albumContainerRef.current.scrollLeft + 300,
  //       behavior: "smooth"
  //     });
  //   }
  // }
  // function scrollLeft() {
  //   if (albumContainerRef.current) {
  //     albumContainerRef.current.scrollTo({
  //       left: albumContainerRef.current.scrollLeft - 300,
  //       behavior: "smooth"
  //     });
  //   }
  // }
  function handleClickAlbum(id) {
    navigate(`/album/${id}`);
  }

  return (
    <div className="w-[100%]">
      <div className="flex text-white justify-between items-center">
        <h2 className="text-white text-[30px] pl-[30px] font-[500]">
          Popular Albums
        </h2>
        {/* <p className="flex gap-[20px] pr-[20px] text-lg">
          <FaArrowLeft className="cursor-pointer" onClick={scrollLeft} />
          <FaArrowRight className="cursor-pointer" onClick={scrollRight} />
        </p> */}
      </div>
      <div
        ref={albumContainerRef}
        className="overflow-x-auto scrollNone transition-all ease-linear duration-200"
      >
        <div className="flex gap-0 pl-[40px] mt-[10px] h-[78%]">
          {albumlist.map((items, index) => {
            return (
              <AlbumCard
                items={items}
                handleClickAlbum={handleClickAlbum}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AlbumRow;
