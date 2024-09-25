import React, { useRef, useState } from "react";
import { GoHeart } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

function SongCard({ item, number }) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(null);
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  return (
    <div className="h-[70%] ml-[40px]">
      <audio
        className="hidden"
        ref={audioRef}
        src={item.song}
        onLoadedMetadata={handleLoadedMetadata}
        controls
      />
      <div className=" ml-[20px] flex justify-between">
        <div className=" flex min-w-[250px] items-center mb-[10px]">
          <p className="text-white text-[15px] w-[20px]  mr-[20px]">{number}</p>
          <img
            className="h-[50px] w-[50px] rounded-[5px] mr-[10px]"
            src={item.image}
            alt=""
          />
          <p className="text-white text-[15px]">{item.title}</p>
        </div>
        <div className="flex items-center text-white">
          <p>{item.artist && item.artist.name}</p>
        </div>
        <div className="text-white flex items-center justify-around  w-[250px] mr-[30px]">
          <GoHeart />
          <p>
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </p>
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
}

export default SongCard;
