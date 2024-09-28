import React, { useEffect, useState, useSyncExternalStore } from "react";
import { GoHeart } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import SongCard from "../components/SongCard";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArtistPreview() {
  const { id } = useParams();
  const [artist, setArtist] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function handleGetArtistSongs(id) {
      try {
        const { data } = await axios.get(`http://localhost:5100/artist/${id}`);
        setArtist(data.artist);
        console.log(data);

      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    }
    if (id) {
      handleGetArtistSongs(id);
    }
  }, [id]);

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs === 0) {
      return `${String(mins).padStart(2, "0")}min ${String(secs).padStart(
        2,
        "0"
      )}sec`;
    }
    return `${String(hrs).padStart(2, "0")}hr ${String(mins).padStart(
      2,
      "0"
    )}min ${String(secs).padStart(2, "0")}sec`;
  }
  
  return isLoading ? (
    <div className="h-[85vh] w-[100%] flex items-center justify-center">
      {/* <SyncLoader color="#ffffff" margin={5} size={10} /> */}
    </div>
  ) : (
    <div className="bg-[rgba(31,18,18,0.2)]">
      <div className="bg-[rgba(31,18,18,0.22)] h-[300px]  flex gap-[1rem] items-center justify-center">
        <div className="h-[100%] w-[20%] flex items-center justify-center p-1">
          <img
            className="h-[250px] w-[250px] rounded-[100%] object-cover"
            src=""
            alt=""
          />
        </div>
        <div className="h-[100%] w-[80%] flex  flex-col justify-center  items-start">
          <h2 className="text-white text-[40px]">{artist&&artist.name}</h2>
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
        { artist && artist.song.map((item,index)=>{
          return  <SongCard key={index} number={index+1}/>;
        })
        }
        
      </div>
    </div>
  );
}

export default ArtistPreview;
