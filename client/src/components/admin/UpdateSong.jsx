import React, { useEffect, useState } from "react";
import SongsList from "./SongsList";
import axios from "axios";
import UpdateSongCard from "./UpdateSongCard";
import { toast } from "react-toastify";

function UpdateSong() {
  const [songlist, setsonglist] = useState([]);
  const [updatename, setupdatename] = useState("");
  const [updatefile, setupdatefile] = useState(null);
  const [curSong, setcurSong] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [Artist, setArtist] = useState([]);
  const [checkArtist, setcheckArtist] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function getAllSongs() {
      try {
        const response = await axios.get("http://localhost:5100/getallsongs");
        setsonglist(response.data.songs);
        console.log(response.data.songs);
      } catch (error) {
        console.log("Error while fetching song list : ", error);
      }
    }

    getAllSongs();
  }, []);

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

  const handleChange = (e, item) => {
    if (e.target.checked) {
      setSelectedOption(item.name);
      setcheckArtist(item._id);
    } else {
      setSelectedOption(null);
    }
  }

  const handleupdatename = (e) => {
    const name = e.target.value;
    setupdatename(name);
  };

  const handleupdatefile = (e) => {
    const file = e.target.files[0];
    setupdatefile(file);
  };

  useEffect(() => {
    console.log(curSong);
  }, [curSong]);

  async function handleupdatesong() {
    if (updatename == "" && updatefile == "") {
      toast.warning("Insert Data of Song");
      return;
    }
    try {
      const formData = new FormData();
      if (updatename !== "") formData.append("title", updatename);
      if (updatefile !== null) formData.append("image", updatefile);
      console.log(updatename, updatefile);

      const response = await axios.put(
        `http://localhost:5100/admin/updatesong/${curSong}`,
        formData
      );

      if (response.status == 200) {
        toast.success("Song Updated");
      }
    } catch (error) {
      console.log("Error while sending song", error);
    }
  }

  return (
    <div className="h-[100vh] flex justify-evenly items-center gap-12">
      <div className="shadow-2xl h-[400px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800">
        <h2 className="mt-9 text-2xl">Update Song</h2>
        <div className="h-[550px] w-[350px] mt-9 flex flex-col text-white">
          <p className="pl-5 my-3">Update Song Name</p>
          <input
            className="p-2 mx-4 rounded-md text-black"
            type="text"
            onChange={handleupdatename}
            value={updatename}
          />
          <p className="pl-5 my-3">Update song Image</p>
          <input
            className=" border border-white p-2 mx-4 rounded-md text-md "
            type="file"
            onChange={handleupdatefile}
          />
          <button
            className=" p-2 mx-4 mt-5 rounded-md text-lg bg-red-400 border-none  hover:bg-red-500 transition-all ease-linear duration-200"
            onClick={handleupdatesong}
          >
            Update Song
          </button>
        </div>
      </div>
      {
        toggle ? (
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
        ):( <div className="shadow-2xl h-[800px] w-[750px] flex items-center flex-col  text-white rounded-lg bg-stone-800 scrollNone">
          <h3 className="mt-9 text-2xl">Song List</h3>
          <div className="flex flex-wrap justify-center w-[100%] h-[90%] gap-[2rem] mt-[10px] overflow-y-auto scrollNone">
            {songlist.map((item, index) => {
              return (
                <UpdateSongCard
                  key={index}
                  name={item.title}
                  image={item.image}
                  setcurSong={setcurSong}
                  id={item._id}
                  settoggle={settoggle}
                />
              );
            })}
          </div>
        </div>)
      }
    </div>
  );
}

export default UpdateSong;
