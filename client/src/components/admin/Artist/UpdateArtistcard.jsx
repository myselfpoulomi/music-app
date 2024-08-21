import React from "react";
import "./UpdateArtistCard.css";
import axios from "axios";
import { useState } from "react";

function UpdateArtistcard({ name, image, id }) {
  const handleDeleteArtist = async () => {
    try {
      const Response = await axios.delete(
        `http://localhost:5100/admin/deleteartist/${id}`
      );
      console.log(Response);
      if (Response.status == 200) {
        alert("Artist Deleted Sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [artistname, setname] = useState("");
  const [file, setfile] = useState(null);
  const handleName = (e) => {
    const artistname = e.target.value;
    setname(artistname);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) setfile(file);
    else alert("inert image only");
  };

  const handleUpdateArtist = async () => {
    if (artistname == "" && file == null) {
      alert("put name and choose file");
      return;
    }
    const formData = new FormData();
    if (artistname!=="")
    formData.append("name", artistname);
  if (file!==null)
    formData.append("file", file);
    try {
      const response = await axios.put(
        `http://localhost:5100/admin/updateartist/${id}`,
        formData
      );
      if (response.status == 200) {
        alert("Artist Updated");
      }
      console.log(response);
    } catch (error) {
      console.log("error while updating artist", error);
    }
  };

  return (
    <div className="UpdateCardContainer">
      <div className="profileofartist">
        <img src={image} alt="" />
        <h3>{name}</h3>
        <div className="inputsafterupdate">
          <input
            className="updateArtistName"
            type="text"
            placeholder="Enter Artist Name"
            onChange={handleName}
            value={artistname}
          />
          <input
            className="updateArtistImg"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="updatebtns">
        <button onClick={handleUpdateArtist}>Update</button>
        <button onClick={handleDeleteArtist}>Delete</button>
      </div>
    </div>
  );
}

export default UpdateArtistcard;
