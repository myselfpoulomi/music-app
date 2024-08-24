import React from "react";
import "./AddAlbum.css"

function AddAlbum() {
  return (
    <div className="AddAlbumContainer">
      <div className="leftConatinerAddAlbum">
        <h3>Add Album</h3>
      <input type="text" placeholder="Add Album Title" />
      <textarea
      placeholder="add Description"
      style={{ height: '100px', width: '400px' }}
    /> 
    <input className="inputfileAddAlbum" type="file" />
    <button className="SubmitAddAlbum">Submit</button>
      </div>
      <div className="rightConatinerAddAlbum">
        songs

      </div>
    </div>
  );
}

export default AddAlbum;
