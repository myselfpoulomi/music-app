import React, { useState } from "react";
import Nav from "../components/navbar/Nav";
import ArtistRow from "../components/ArtistRow/ArtistRow";
import SongRow from "../components/Songs/SongRow";
import AlbumRow from "../components/Album/AlbumRow";
import MusicPlayer from "../components/music/MusicPlayer";
import Songlist from "./Songlist";

function Home() {
  const [curSong, setcurSong]= useState('');
  const [toggle, settoggle] = useState(false);
  return (
    
    <>
      <div className="main-left"></div>
      <div className="main-right scrollNone">
        <Nav /> 
        {toggle? 
        <div>
        <Songlist/>
        </div> :
        <div>
        <ArtistRow />
        <SongRow setcurSong={setcurSong}/> 
        <AlbumRow settoggle={settoggle}/>
        </div>}
      </div>
      {/* <MusicPlayer audioSrc={curSong}/> */}
    </>
  );
}

export default Home;