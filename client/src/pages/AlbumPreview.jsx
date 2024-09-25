import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import SongCard from "../components/SongCard";
import { useExtractColor } from "react-extract-colors";
import { useParams } from "react-router-dom";
import axios from "axios";

const image =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor6eFhtElNPyzMy1gqnapjDab_ZYJC3LQag&s";

function AlbumPreview() {
  const [album, setAlbum] = useState("");
  const { id } = useParams();
  const { dominantColor, darkerColor, lighterColor } = useExtractColor(
    album.image
  );

  useEffect(() => {
    async function handleGetAlbumSongs(id) {
      try {
        const { data } = await axios.get(`http://localhost:5100/album/${id}`);
        setAlbum(data.album);
      } catch (error) {
        console.log(error);
      }
    }
    if (id) {
      handleGetAlbumSongs(id);
    }
  }, [id]);

  return (
    <div className=" h-[85vh] w-[100%]">
      <div
        style={{
          background: `linear-gradient(-100deg, ${dominantColor}, ${darkerColor}, ${lighterColor})`
        }}
        className={` w-[100%] h-[300px] flex items-center pl-[20px] gap-[2rem]`}
      >
        <img
          className="shadow-2xl h-[200px] w-[200px] rounded-lg object-cover"
          src={album.image}
          alt=""
        />
        <div className="text-white flex flex-col">
          <p>Album</p>
          <h1 className="text-[80px] font-bold">{album.title}</h1>
          <div className="flex items-center gap-[4px]">
            <p>Mithoon </p>
            <GoDotFill className="text-[10px]" />
            <p>Ankit Tiwari</p>
            <GoDotFill className="text-[10px]" />
            <p>Jeet Ganguly</p>
            <GoDotFill className="text-[10px] text-zinc-400" />
            {/* <p className="text-zinc-200 text-[13px]">{}</p> */}
            <GoDotFill className="text-[10px] text-zinc-400" />
            <p className="text-zinc-200 text-[13px]">
              {album.songs&&album.songs.length} songs, 54 min 41 sec
            </p>
          </div>
        </div>
        <button className="p-[7px] text-white rounded-full w-[120px] h-[50px] bg-teal-700">
          Play
        </button>
        <GoHeart className="text-white font-bold text-[40px] border border-white p-[8px] rounded-full" />
        <BsThreeDotsVertical className="text-white font-bold text-[40px] border border-white p-[8px] rounded-full" />
      </div>
      <div className=" h-[70%]">
        <div className=" ">
          <h1 className="text-white text-[25px] my-[10px] ml-[30px]">
            Songs :
          </h1>
          {album &&
            album.songs.map((item, index) => {
              return <SongCard key={index} item={item} number={index + 1} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default AlbumPreview;
