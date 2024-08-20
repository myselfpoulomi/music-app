import React from "react";
import Nav from "../components/navbar/Nav";
import ArtistRow from "../components/ArtistRow/ArtistRow";

function Home() {
  return (
    <>
      <div className="main-left"></div>
      <div className="main-right">
        <Nav /> 
        <ArtistRow/>
      </div>
    </>
  );
}

export default Home;