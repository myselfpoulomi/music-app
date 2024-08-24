import React, { useEffect, useState } from "react";
import "./AddAlbum.css";
import SongsList from "./SongsList";
import axios from "axios";

function AddAlbum() {
  const [songlist, setsonglist] = useState([]);
  useEffect(() => {
    async function getAllSongs() {
      try {
        const response = await axios.get("http://localhost:5100/getallsongs");
        setsonglist(response.data.songs);
      } catch (error) {
        console.log("Error while fetching song list : ", error);
      }
    }
    getAllSongs();
  }, []);

  return (
    <div className="AddAlbumContainer">
      <div className="leftConatinerAddAlbum">
        <h3>Add Album</h3>
        <input type="text" placeholder="Add Album Title" />
        <textarea
          placeholder="add Description"
          style={{ height: "100px", width: "400px" }}
        />
        <input className="inputfileAddAlbum" type="file" />
        <button className="SubmitAddAlbum">Submit</button>
      </div>
      <div className="rightConatinerAddAlbum">
        <h3>Song List</h3>
        
       {
        songlist.map ((items,index) => (
           <SongsList key={index} title={items.title} />
        )) }
       
      </div>
    </div>
  );
}

export default AddAlbum;
