import React, { useEffect, useState } from "react";

import SongsList from "./SongsList";
import axios from "axios";
import { toast } from "react-toastify";

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
  }, [setSongs]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) setfile(file);
    else toast.warning("inert image only");
  };

  async function settingAlbum() {
    if (name == "" || desc == "" || file == null) {
      toast.warning("please provide album details");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("desc", desc);
      formData.append("file", file);
      formData.append("songs", setSongs.join(","));
      const response = await axios.post(
        "http://localhost:5100/admin/addalbum",
        formData
      );

      toast.success("Album Added Successfully");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-[100vh] flex justify-evenly items-center gap-12">
      <div className="shadow-2xl h-[600px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800">
        <h3 className="mt-9 text-2xl">Add Album</h3>
        <div className=" h-[550px] w-[350px] mt-9 flex flex-col text-white ">
          <p className=" my-3">Add Album Title</p>
          <input
            className=" py-[6px] px-[20px] rounded-md text-black"
            onChange={(e) => {
              setname(e.target.value);
            }}
            type="text"
            placeholder="Add Album Title"
          />
          <p className=" my-3">Add Album Decscption</p>
          <textarea
            className=" py-[6px] px-[20px]  rounded-[8px] text-black"
            onChange={(e) => {
              setdesc(e.target.value);
            }}
            placeholder="Add Description"
            style={{ height: "100px", width: "350px" }}
          />
          <p className=" my-3">Add Album Image</p>
          <input
            onChange={handleFileChange}
            className=" py-[6px] px-[20px] border border-white  rounded-md text-md "
            type="file"
          />
          <button  onClick={settingAlbum} className=" p-2  mt-5 rounded-md text-lg bg-red-400 border-none hover:bg-red-500 transition-all ease-linear duration-200 ">
            Submit
          </button>
        </div>
      </div>
      <div className="shadow-2xl h-[600px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800 overflow-y-auto scrollNone">
        <h3 className="mt-9 text-2xl">Song List</h3>

        {songlist.map((items, index) => (
          <SongsList
            key={index}
            title={items.title}
            setSongs={setSongs}
            id={items._id}
            setsetSongs={setsetSongs}
          />
    
        ))}
      </div>
    </div>
  );
}

export default AddAlbum;
