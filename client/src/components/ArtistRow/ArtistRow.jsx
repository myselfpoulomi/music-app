import React, { useState , useEffect } from "react";
import "./ArtistRow.css";
import Artistcard from "./ArtistCard/Artistcard";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios'

function ArtistRow() {
  const [artistList, setartistList] = useState([]);
  useEffect(() => {
    async function getallArtist() {
        console.log("hi");
        try {
            const Response = await axios.get ("http://localhost:5100/getallartists")
        } catch (error) {
            console.log("Error while accesing artist list" , error);
            
        }
    } 
    getallArtist();
  });

  return (
    <div className="ArtistRow">
      <div className="headingForArtist">
        <h2>Popular Artist</h2>
        <p className="arrows">
          <FaArrowLeft />
          <FaArrowRight />
        </p>
      </div>
      <div className="ArtistProfile">
        <Artistcard />
        <Artistcard />
        <Artistcard />
        <Artistcard />
      </div>
    </div>
  );
}

export default ArtistRow;
