
import React, { useState , useEffect } from "react";
import { IoLogoHackernews } from "react-icons/io5";
// import { toast } from "react-toastify";
import axios from 'axios'
import './MannageArtist.css'
import UpdateArtistcard from "./UpdateArtistcard";


function AddArtist() {
  const [name, setname] = useState("");
  const [file, setfile] = useState(null);
  const handleName = (e) => {
    const name = e.target.value;
    setname(name);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) setfile(file);
    else alert ("inert image only");
  };

  const handleAddArtist = async () => {
    if (name == "" || file == null) {
        alert ("put name and choose file");
      return;
    }
    const formData = new FormData ();
    formData.append('name' , name);
    formData.append('file', file);
    try {
        const response = await axios.post("http://localhost:5100/admin/addartist",formData);
        if (response.status==200) {
            alert ("Artist Added");
        } 
        console.log(response);
        
    } catch (error) {
    console.log("error while adding artist" , error);

    }
  };
  const [artistList, setartistList] = useState([]);
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



  const [updatename, setupdatename] = useState("");
  const [updatefile, setupdatefile] = useState(null);
  const [setidtoupdate, setsetidtoupdate] = useState(null)
  const handleNameupdate = (e) => {
    const artistname = e.target.value;
    setupdatename(artistname);
  };
  const handleFileChangeupdate = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) setupdatefile(file);
    else alert("inert image only");
  };

  const handleUpdateArtist = async () => {
    const id = setidtoupdate
    if (updatename == "" && updatefile == null) {
      alert("put name and choose file");
      return;
    }
    const formData = new FormData();
    if (updatename !== "") formData.append("name", updatename);
    if (updatefile !== null) formData.append("file", updatefile);
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

  

  const [toggleInputs, settoggleInputs] = useState(false);

  return (
    <div className="MannageArtistContainer">
      <div className="AddArtistContainer">
      <h2 className="addArtistHeadline">Add Artist</h2>
      <input className="inputname" type="text" onChange={handleName}  value={name}/>
      <input className="inputfile" type="file" onChange={handleFileChange}/>
      <button className="addArtistBtn" onClick={handleAddArtist}>Add Artist</button>
      {toggleInputs && (
          <div className="inputsafterupdate">
            <p>Update artist</p>
            <input
              className="updateArtistName"
              type="text"
              placeholder="Enter Artist Name"
              onChange={handleNameupdate}
              value={updatename}
            />
            <input
              className="updateArtistImg"
              type="file"
              onChange={handleFileChangeupdate}
            />
            <button onClick={handleUpdateArtist}>Update Artist</button>
          </div>
        )}
    </div>
    <div className="UpdateArtistContainer">
     
      <h2 className="headingUpdateArtist">Update Artist</h2>
      <div className="updateArtistCard">
      {artistList.map((item, index) => {
    
          
          return < UpdateArtistcard key={index} name={item.name} image={item.image} id={item._id}  settoggleInputs={settoggleInputs} setsetidtoupdate={setsetidtoupdate}/>;
        })}
      </div>
    </div>
    </div>
  );
}

export default AddArtist;
