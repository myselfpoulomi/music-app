import React from 'react'
import { GoHeart } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

function SongCard() {
  return (
    <div className="h-[70%] ml-[40px]">
        
        <div className="ml-[20px] flex justify-between">
          <div className="flex w-[250px] items-center justify-around mb-[10px]">
            <p className="text-white text-[15px]">1</p>
            <img
              className="h-[50px] w-[50px] rounded-lg"
              src="https://i.scdn.co/image/ab67616d00001e02e211a32490d19aa970956a7d"
              alt=""
            />
            <p className="text-white text-[15px]">Agar Tum sath Ho</p>
          </div>
          <div className="flex items-center text-white">
            <p>Arijit Singh</p>
          </div>
          <div className="text-white flex items-center justify-around  w-[250px] mr-[30px]">
          <GoHeart />
          <p>2:03</p>
          <BsThreeDotsVertical/>
          </div>
        </div>
      </div>
  )
}

export default SongCard