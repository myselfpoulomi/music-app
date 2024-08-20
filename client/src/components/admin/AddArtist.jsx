import React, { useState } from "react";
import { toast } from "react-toastify";

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
    else toast.warn ("inert image only");
  };

  const handleAddArtist = () => {
    if (name == "" || file == null) {
        toast.warn ("put name and choose file");
      return;
    }
    console.log(name, file);
  };
  return (
    <div>
      <input type="text" onChange={handleName} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleAddArtist}>Add Artist</button>
    </div>
  );
}

export default AddArtist;
