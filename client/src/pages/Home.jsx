import React from "react";
import Nav from "../components/navbar/Nav";
import ArtistRow from "../components/ArtistRow/ArtistRow";
import SongRow from "../components/Songs/SongRow";
import AlbumRow from "../components/Album/AlbumRow";

function Home() {
  return (
    <>
      <div className="main-left"></div>
      <div className="main-right">
        <Nav /> 
        <ArtistRow/>
        <SongRow/> 
        <AlbumRow />
      </div>
    </>
  );
}

export default Home;