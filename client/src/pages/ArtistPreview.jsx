import React from "react";
import { GoHeart } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

function ArtistPreview() {
  return (
    <div className="bg-[rgba(31,18,18,0.2)]">
      <div className="bg-[rgba(31,18,18,0.22)] h-[300px]  flex gap-[1rem] items-center justify-center">
        <div className="h-[100%] w-[20%] flex items-center justify-center p-1">
          <img
            className="h-[250px] w-[250px] rounded-[100%] object-cover"
            src="https://cdn.siasat.com/wp-content/uploads/2023/10/arijit-singh.jpg"
            alt=""
          />
        </div>
        <div className="h-[100%] w-[80%] flex  flex-col justify-center  items-start">
          <h2 className="text-white text-[40px]">Arijit Singh</h2>
          <p className="text-white">7,000 Listeners</p>
          <div className=" mt-2 flex gap-[3rem] justify-center items-center h-[70px]">
            <button className=" p-[7px] text-white rounded-full w-[120px] h-[50px] bg-teal-700">
              Play
            </button>
            <GoHeart className="text-white font-bold text-[40px] border border-white p-[8px] rounded-full" />
            <BsThreeDotsVertical className="text-white font-bold text-[40px] border border-white p-[8px] rounded-full" />
          </div>
        </div>
      </div>
      <div className="h-[70%] ml-[40px]">
        <h1 className="text-white text-[25px] mb-[10px]">Popular Hits :</h1>
        <div className="ml-[20px] flex justify-between">
          <div className="flex w-[250px] items-center justify-around">
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
    </div>
  );
}

export default ArtistPreview;
