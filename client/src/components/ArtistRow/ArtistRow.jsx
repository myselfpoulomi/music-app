import React, { useState, useEffect, useRef } from "react";
import "./ArtistRow.css";
import Artistcard from "./ArtistCard/Artistcard";
// import { FaArrowLeft } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

function ArtistRow() {
  const [artistList, setartistList] = useState([]);
  const artistContainerRef = useRef(null);
  useEffect(() => {
    async function getallArtist() {
      try {
        const Response = await axios.get("http://localhost:5100/getallartists");
        setartistList(Response.data.artistList);
      } catch (error) {
        console.log("Error while accesing artist list", error);
      }
    }
    getallArtist();
  }, []);

  // function slideRight() {
  //   if (artistContainerRef.current) {
  //     artistContainerRef.current.scrollTo({
  //       left: artistContainerRef.current.scrollLeft + 300,
  //       behavior: "smooth"
  //     });
  //   }
  // }
  // function slideLeft() {
  //   if (artistContainerRef.current) {
  //     artistContainerRef.current.scrollTo({
  //       left: artistContainerRef.current.scrollLeft - 300,
  //       behavior: "smooth"
  //     });
  //   }
  // }

  return (
    <div className="ArtistRow">
      <div className="headingForArtist">
        <h2>Popular Artist</h2>
        
      </div>
      <div
        ref={artistContainerRef}
        className="ArtistProfile overflow-x-auto scrollNone transition-all ease-linear duration-200"
      >
        {artistList.map((item, index) => {
          return <Artistcard key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default ArtistRow;
