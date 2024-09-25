import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import SongCard from "../components/SongCard";
import { useExtractColor } from "react-extract-colors";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BeatLoader, FadeLoader, SyncLoader } from "react-spinners";

function AlbumPreview() {
  const [isLoading, setisLoading] = useState(true);
  const [albumArtist, setAlbumArtist] = useState([]);
  const [totalhour, setTotalhour] = useState("");
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
      } finally {
        setisLoading(false);
      }
    }
    if (id) {
      handleGetAlbumSongs(id);
    }
  }, [id]);

  // get total hours
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
  useEffect(() => {
    if (!album) return;
    const audioElements = [];
    const songDurationPromises = album.songs.map((item) => {
      return new Promise((resolve) => {
        const audio = new Audio(item.song);
        audioElements.push(audio);
        audio.addEventListener("loadedmetadata", () => {
          resolve(audio.duration);
        });
      });
    });
    Promise.all(songDurationPromises).then((results) => {
      let sum = 0;
      results.forEach((result) => {
        sum += result;
      });
      setTotalhour(formatTime(sum));
    });
    return () => {
      audioElements.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [album]);

  // set artists
  useEffect(() => {
    if (!album) return;
    let artistSet = new Set();
    album.songs.map((item) => {
      artistSet.add(item.artist.name);
    });
    artistSet = Array.from(artistSet);
    setAlbumArtist(artistSet.slice(0, 3));
  }, [album]);

  return isLoading ? (
    <div className="h-[85vh] w-[100%] flex items-center justify-center">
      <SyncLoader color="#ffffff" margin={5} size={10} />
    </div>
  ) : (
    <div
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 1) 10%, ${darkerColor} 38%, ${lighterColor} 100%, ${dominantColor} 0%)`
      }}
      className=" min-h-[100vh] w-[100%]"
    >
      <div
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
            {albumArtist &&
              albumArtist.map((item, index) => {
                return (
                  <>
                    <p>{item}</p>
                    <GoDotFill className="text-[10px]" />
                  </>
                );
              })}
            <p className="text-zinc-200 text-[13px]">
              {album.songs && album.songs.length} songs, {totalhour}
            </p>
          </div>
        </div>
        <button className="p-[7px] text-white rounded-full w-[120px] h-[50px] bg-teal-700">
          Play
        </button>
        <GoHeart className="text-white font-bold text-[40px] border border-white p-[8px] rounded-full" />
        <BsThreeDotsVertical className="text-white font-bold text-[40px] border border-white p-[8px] rounded-full" />
      </div>
      <div className=" min-h-[60%]">
        <div className=" ">
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
