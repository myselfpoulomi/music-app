import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Route, Routes, useNavigate } from "react-router-dom";
import Songlist from "../../pages/Songlist";

function AlbumRow({ settoggle }) {
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

  function handleClickAlbum() {
    settoggle(true);
  }

  return (
    <div className="w-[100%]">
      <div className="flex text-white justify-between items-center">
        <h2 className="text-white text-[30px] pl-[30px] font-[500]">Albums</h2>
        <p className="flex gap-[20px] pr-[20px] text-lg">
          <FaArrowLeft className="cursor-pointer" onClick={scrollLeft} />
          <FaArrowRight className="cursor-pointer" onClick={scrollRight} />
        </p>
      </div>
      <div
        ref={albumContainerRef}
        className="overflow-x-auto scrollNone transition-all ease-linear duration-200"
      >
        <div className="flex gap-[0.1rem] pl-[40px] mt-[10px] h-[78%]">
          {albumlist.map((items, index) => {
            return (
              <div
                key={index}
                className="h-[240px] min-w-[210px] hover:bg-[rgba(31,18,18,0.252)] rounded-[10px] flex flex-col items-center justify-center  transition-all duration-700 ease-in-out hover:shadow-[rgba(0,0,0,0.3)]"
                onClick={handleClickAlbum}
              >
                {/* {navList.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => {
                        navigate(item.path);
                        console.log("Album Clicked");
                
                      }}
                    >
                      {item.name}
                    </p
                  );
                })}  */}
                <Routes>
                  <Route path="/songs" element={<Songlist />} />
                </Routes>
                <img
                  className="h-[170px] w-[170px] object-cover rounded-[7px] mb-3 transform transition-transform duration-300 ease-in-out hover:scale-105 "
                  src={items.image}
                  alt=""
                />
                <p className="text-white text-[20px] text-center mt-[3px]">
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
