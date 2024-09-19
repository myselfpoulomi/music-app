import React, { useState } from "react";
import Nav from "../components/navbar/Nav";
import ArtistRow from "../components/ArtistRow/ArtistRow";
import SongRow from "../components/Songs/SongRow";
import AlbumRow from "../components/Album/AlbumRow";
import MusicPlayer from "../components/music/MusicPlayer";

function Home() {
  const [curSong, setcurSong]= useState('');

  return (
    <>
      <div className="main-left"></div>
      <div className="main-right scrollNone">
        <Nav /> 
        <ArtistRow/>
        <SongRow setcurSong={setcurSong}/> 
        <AlbumRow />
        
      </div>
      <MusicPlayer audioSrc={curSong}/>
    </>
  );
}

export default Home;