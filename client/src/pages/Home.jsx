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

function Home() {
  const [curSong, setcurSong] = useState("");
  const [toggle, settoggle] = useState(false);
  return (
    <>
      <div className="main-left"></div>
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
            <Route path="/artist/*" element={<ArtistPreview />} />
            <Route path="/album/*" element={<AlbumPreview />} />
          </Routes>
        </div>
      </div>
      {/* <MusicPlayer audioSrc={curSong}/> */}
    </>
  );
}

export default Home;
