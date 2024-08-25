import React from "react";
import Nav from "../components/navbar/Nav";
import ArtistRow from "../components/ArtistRow/ArtistRow";
import SongRow from "../components/Songs/SongRow";

function Home() {
  return (
    <>
      <div className="main-left"></div>
      <div className="main-right">
        <Nav /> 
        <ArtistRow/>
        <SongRow/> 
      </div>
    </>
  );
}

export default Home;