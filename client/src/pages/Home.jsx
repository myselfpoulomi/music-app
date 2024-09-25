import React, { useState } from "react";
import Nav from "../components/navbar/Nav";
import ArtistRow from "../components/ArtistRow/ArtistRow";
import SongRow from "../components/Songs/SongRow";
import AlbumRow from "../components/Album/AlbumRow";
import MusicPlayer from "../components/music/MusicPlayer";
import Songlist from "./Songlist";
import { Routes, Route } from "react-router-dom";
import ArtistPreview from "./ArtistPreview";
import AlbumPreview from "./AlbumPreview";
import { BiLibrary } from "react-icons/bi";
import { GoPlusCircle } from "react-icons/go";
import PlayList from "../components/PlayList";

function Home() {
  const [curSong, setcurSong] = useState("");

  return (
    <>
      <div className="main-left">
        <div className="h-[40px] w-[90%] m-[20px] flex items-center">
          <div className="flex items-center gap-2 w-[50%] text-white text-[20px]">
            <BiLibrary />
            <p>Your Library</p>
          </div>
          <div className="w-[50%] flex items-center justify-end text-white ">
            <GoPlusCircle className="text-[20px]" />
          </div>
        </div> 
        <div>
          <PlayList />
        </div>
      </div>
      <div className="main-right scrollNone">
        <Nav />
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ArtistRow />
                  <SongRow setcurSong={setcurSong} />
                  <AlbumRow />
                </>
              }
            />
            <Route path="/artist/:id" element={<ArtistPreview />} />
            <Route path="/album/:id" element={<AlbumPreview />} />
          </Routes>
        </div>
      </div>
      {/* <MusicPlayer audioSrc={curSong} /> */}
    </>
  );
}

export default Home;
