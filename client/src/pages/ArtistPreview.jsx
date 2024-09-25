import React from "react";
import { GoHeart } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import SongCard from "../components/SongCard";

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
      <div className="overflow-y-auto">
      <h1 className="text-white text-[25px] my-[10px] ml-[30px]">Popular Hits :</h1>
        {
          Array.from({length:10}).fill("").map((item,index)=>{
            return  <SongCard key={index} number={index+1}/>
          })
        }
        
      </div>
    </div>
  );
}

export default ArtistPreview;
