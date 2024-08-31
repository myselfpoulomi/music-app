import React, { useState, useEffect } from "react";
import { IoLogoHackernews } from "react-icons/io5";
// import { toast } from "react-toastify";
import axios from "axios";
import "./MannageArtist.css";
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
    else alert("inert image only");
  };

  const handleAddArtist = async () => {
    if (name == "" || file == null) {
      alert("put name and choose file");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:5100/admin/addartist",
        formData
      );
      if (response.status == 200) {
        alert("Artist Added");
      }
      console.log(response);
    } catch (error) {
      console.log("error while adding artist", error);
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
  const [setidtoupdate, setsetidtoupdate] = useState(null);
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
    const id = setidtoupdate;
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
    <div className=" h-[100vh] flex justify-evenly items-center gap-12">
      <div className="shadow-2xl h-[400px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800 ">
      <h2 className="mt-9 text-2xl">Add Artist</h2> 
      <div className=" h-[550px] w-[350px] mt-9 flex flex-col text-white  ">
          <p className="pl-5 my-3">Add Artist Name</p>
          <input
            className="p-2 mx-4 rounded-md "
            type="text"
            placeholder="Enter Artist Name"
          />
          <p className="pl-5 my-3">Add Artist Image</p>
          <input
            className=" border border-white p-2 mx-4 rounded-md text-md "
            type="file"
          />

          <button className=" p-2 mx-4 mt-5 rounded-md text-lg bg-red-400 border-none ">
            Submit 
          </button>
        </div>
        {/* <h2 className="mt-9 text-2xl">Add Artist</h2>

        <input
          className="p-2 mx-4 rounded-md"
          type="text"
          placeholder="Add Artist Name"
          onChange={handleName}
          value={name}
        />
        <input className="inputfile" type="file" onChange={handleFileChange} />
        <button className="addArtistBtn" onClick={handleAddArtist}>
          Add Artist
        </button>
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
        )} */}
      </div>
      <div className="shadow-2xl h-[800px] w-[750px] flex items-center flex-col  text-white rounded-lg bg-stone-800">
        <h2 className="headingUpdateArtist">Update Artist</h2>
        <div className="updateArtistCard">
          {artistList.map((item, index) => {
            return (
              <UpdateArtistcard
                key={index}
                name={item.name}
                image={item.image}
                id={item._id}
                settoggleInputs={settoggleInputs}
                setsetidtoupdate={setsetidtoupdate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddArtist;
