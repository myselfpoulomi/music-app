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

  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [file, setfile] = useState(null);

  const [setSongs, setsetSongs] = useState([]);
  

    useEffect(() => {
      console.log(setSongs);
      
    }, [setSongs])
    

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) setfile(file);
    else alert("inert image only");
  };

  async function settingAlbum() {
    if (name == "" || desc == "" || file == null) {
      alert("please provide album details");
      return;
    } 
    try {
      const formData = new FormData ();
    formData.append('title' , name);
    formData.append('desc' , desc);
    formData.append('file', file);
    formData.append('songs' , setSongs.join(","));
      const response = await axios.post("http://localhost:5100/admin/addalbum" ,formData )
      

  console.log(response);
  
    } catch (error) {
      console.log(error);
      
    }
  }
  
    

  return (
    <div className="AddAlbumContainer">
      <div className="leftConatinerAddAlbum">
        <h3>Add Album</h3>
        <input
          onChange={(e) => {
            setname(e.target.value);
          }}
          type="text"
          placeholder="Add Album Title"
        />
        <textarea
          onChange={(e) => {
            setdesc(e.target.value);
          }}
          placeholder="add Description"
          style={{ height: "100px", width: "400px" }}
        />
        <input
          onChange={handleFileChange}
          className="inputfileAddAlbum"
          type="file"
        />
        <button onClick={settingAlbum} className="SubmitAddAlbum">
          Submit
        </button>
      </div>
      <div className="rightConatinerAddAlbum">
        <h3>Song List</h3>

        {songlist.map((items, index) => (
          <SongsList key={index} title={items.title} setSongs={setSongs} id={items._id} setsetSongs={setsetSongs}  />
        ))}
      </div>
    </div>
  );
}

export default AddAlbum;
