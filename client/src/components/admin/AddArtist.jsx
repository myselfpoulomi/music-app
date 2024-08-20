import React, { useState } from "react";
import { IoLogoHackernews } from "react-icons/io5";
// import { toast } from "react-toastify";
import axios from 'axios'

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
  return (
    <div>
      <input type="text" onChange={handleName}  value={name}/>
      <input type="file" onChange={handleFileChange}/>
      <button onClick={handleAddArtist}>Add Artist</button>
    </div>
  );
}

export default AddArtist;
