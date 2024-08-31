import React, { useEffect, useState } from "react";
import axios from "axios";

function AddSong() {
  const [Artist, setArtist] = useState([]);
  const [name, setname] = useState("");
  const [file, setfile] = useState(null);
  const [audio, setaudio] = useState(null);
  const [checkArtist, setcheckArtist] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    async function getallArtist() {
      try {
        const Response = await axios.get("http://localhost:5100/getallartists");
        setArtist(Response.data.artistList);
      } catch (error) {
        console.log("Error while Getting Artist List", error);
      }
    }
    getallArtist();
  }, []);

  async function handleSubmitAlbum  ()  {
    if (name == ""||file==null||audio==null) {
      alert("Provide Song Details")
    } else {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("image", file);
      formData.append("song", audio);
      formData.append("artist",checkArtist);
      try {
        const response = await axios.post ("http://localhost:5100/admin/addsong",formData);
        alert("Song Added");
      } catch (error) {
        console.log("Error while putting song" , error);
        
      }
      
      
    }
  };

  const handleChange = (e, item) => {
    if (e.target.checked) {
      setSelectedOption(item.name);
      setcheckArtist(item._id);
    } else {
      setSelectedOption(null);
    }

    // useEffect(() => {

    // console.log(checkArtist);

    // }, [])

    // function CheckboxList({ items }) {
    //   // State to store the selected item

    //    handleChange = (e, item);
    //   };

  };

  useEffect(() => {
    console.log(checkArtist);
  }, [checkArtist]);

  return (
    <div className=" h-[100vh] flex justify-evenly items-center gap-12 ">
      <div className="shadow-2xl h-[600px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800 ">
        <h2 className="mt-9 text-2xl">Add New Song</h2>
        <div className=" h-[550px] w-[350px] mt-9 flex flex-col text-white ">
          <p className="pl-5 my-3">Add Song Name</p>
          <input
            className="p-2 mx-4 rounded-md  text-black"
            type="text"
            placeholder="Enter Song Name"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <p className="pl-5 my-3">Add Song Image</p>
          <input
            className=" border border-white p-2 mx-4 rounded-md text-md "
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file.type.startsWith("image/")) setfile(file);
              else alert("inert image only");
            }}
          />
          <p className="pl-5 my-3">Add Song</p>
          <input
            className=" border border-white p-2 mx-4 rounded-md text-md "
            type="file"
            accept=".mp3"
            onChange={(e) => {
              const audio = e.target.files[0];

              if (audio.type.startsWith("audio/")) setaudio(audio);
              else alert("inert audio only");
            }}
          />

          <button
            className=" p-2 mx-4 mt-5 rounded-md text-lg bg-red-400 border-none hover:bg-red-500 transition-all ease-linear duration-200
           "
            onClick={handleSubmitAlbum}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="shadow-2xl h-[600px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800">
        <h2 className="mt-9 text-2xl">Artist List</h2>
        {Artist.map((item, index) => {
          return (
            <div
              key={index}
              className=" w-[350px] mt-9 flex flex-row gap-4 items-center"
            >
              <input
                checked={selectedOption === item.name} // Only checks the checkbox if it matches the selectedOption
                onChange={(e) => handleChange(e, item)}
                className="appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-white"
                type="checkbox"
              />
              <p className="text-[20px]">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AddSong;
