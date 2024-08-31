import React from "react";
import "./UpdateArtistCard.css";
import axios from "axios";
import { useState } from "react";

function UpdateArtistcard({
  name,
  image,
  id,
  settoggleInputs,
  setsetidtoupdate
}) {
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

  // const [artistname, setname] = useState("");
  // const [file, setfile] = useState(null);
  // const handleName = (e) => {
  //   const artistname = e.target.value;
  //   setname(artistname);
  // };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file.type.startsWith("image/")) setfile(file);
  //   else alert("inert image only");
  // };

  // const handleUpdateArtist = async () => {
  //   if (artistname == "" && file == null) {
  //     alert("put name and choose file");
  //     return;
  //   }
  //   const formData = new FormData();
  //   if (artistname !== "") formData.append("name", artistname);
  //   if (file !== null) formData.append("file", file);
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5100/admin/updateartist/${id}`,
  //       formData
  //     );
  //     if (response.status == 200) {
  //       alert("Artist Updated");
  //     }
  //     console.log(response);
  //   } catch (error) {
  //     console.log("error while updating artist", error);
  //   }
  // };

  // const [toggleInputs, settoggleInputs] = useState(false);

  return (
    <div className="w-[300px] flex flex-col items-center justify-center">
      <div className=" w-[300px]  flex flex-col items-center">
        <img
          className="h-[370px] w-[300px] object-cover rounded-lg"
          src={image}
          alt=""
        />
        <h3 className="mt-[10px] text-[20px] font-bold">{name}</h3>

        {/* {toggleInputs && (
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
            <button onClick={handleUpdateArtist}>Update Artist</button>
          </div>
        )} */}
      </div>
      <div className="mt-[10px] flex h-[50px] w-[300px] gap-3">
        <button
          className="bg-emerald-500 p-2 w-[50%] rounded-lg text-[20px] hover:bg-emerald-700 transition-all ease-linear duration-200"
          onClick={() => {
            settoggleInputs((prev) => !prev);
            setsetidtoupdate(id);
          }}
        >
          Update
        </button>
        <button
          className="bg-red-400 p-2 w-[50%] rounded-lg  text-[20px]"
          onClick={handleDeleteArtist}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default UpdateArtistcard;
