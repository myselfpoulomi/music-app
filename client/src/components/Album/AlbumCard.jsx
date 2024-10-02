import React, { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

function AlbumCard({ items, handleClickAlbum }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
      className="h-[300px] min-w-[230px] hover:bg-[rgba(5,5,5,0.227)] rounded-[10px] flex flex-col items-center py-4 px-2 transition-all  hover:shadow-[rgba(0,0,0,0.3)] relative"
      onClick={() => handleClickAlbum(items._id)}
    >
      <img
        className="h-[210px] w-[210px] object-cover rounded-[7px] mb-3 transform transition-transform duration-100 ease-in-out hover:scale-100 "
        src={items.image}
        alt=""
      />
      <FaCirclePlay
        className="transtoin-all h-[50px] w-[50px] absolute    z-1 bottom-2 right-2  transition-transform duration-150 ease-in-out hover:scale-110 text-[20px] text-teal-700  rounded-full bg-black"
        style={{
          opacity: toggle ? 1 : 0,
          top: "65%",
          left: "80%",
          transform: "translate(-50%, -50%)"
        }}
      />

      <p className="text-white text-[20px] text-center mt-[3px] mb-10">
        {items.title}
      </p>
    </div>
  );
}

export default AlbumCard;
