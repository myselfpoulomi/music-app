import React, { useState } from "react";
import Nav from "../components/navbar/Nav";
import ArtistRow from "../components/ArtistRow/ArtistRow";

import AlbumRow from "../components/Album/AlbumRow";
import MusicPlayer from "../components/music/MusicPlayer";

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
        <div className="m-[10px] rounded-[10px] bg-teal-900 min-h-[800px] p-[10px]">
          <div className="h-[40px] w-[90%] m-[20px] flex items-center text-[21px] ">
            <div className="flex items-center gap-2 w-[90%] text-white">
              <BiLibrary />
              <p>Your Library</p>
            </div>
            <div className="w-[50%] flex items-center justify-end text-white ">
              <GoPlusCircle />
            </div>
          </div>

          <div>
            <PlayList />
          </div>
        </div>
      </div>
      <div className="main-right scrollNone  bg-[#161717]">
        <Nav />
        <div className="p-[10px] bg-[#232424] rounded-[10px] m-[10px]">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ArtistRow />
                  {/* <SongRow setcurSong={setcurSong} />                   */}
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
