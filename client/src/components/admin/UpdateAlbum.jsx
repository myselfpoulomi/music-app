import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AlbumList from "./AlbumList";
import SongsList from "./SongsList";
import { toast } from "react-toastify";

function UpdateAlbum() {
  const [albumList, setalbumList] = useState([]);
  const [curAlbum, setcurAlbum] = useState("");
  const [updatetitle, setupdatetitle] = useState("");
  const [updatefile, setupdatefile] = useState(null);
  const [toggle, settoggle] = useState(false);
  const [updatedesc, setupdatedesc] = useState("");

  const handleNameupdate = (e) => {
    const name = e.target.value;
    setupdatetitle(name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) setupdatefile(file);
    else toast.warning("inert image only");
  };

  useEffect(() => {
    async function getallAlbum() {
      try {
        const Response = await axios.get("http://localhost:5100/getallalbums");
        setalbumList(Response.data.albumList);
      } catch (error) {
        console.log("Error while accesing album list", error);
      }
    }
    getallAlbum();
  }, []);
  
  useEffect(() => {
    console.log(curAlbum);
  }, [curAlbum]);
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

  const [setSongs, setsetSongs] = useState([]);

  useEffect(() => {
    console.log(setSongs);
  }, [setSongs]);

  async function handleUpdateAlbum() {
    if (updatetitle == "" && updatefile == "") {
      toast.warning("Insert Data of Album");
      return;
    }
    try {
      const formData = new FormData();
      if (updatetitle !== "") formData.append("title", updatetitle);
      if (updatefile !== null) formData.append("file", updatefile);
      if (updatedesc!== "") formData.append("desc" , updatedesc);
      formData.append("songs", setSongs);
      console.log(updatetitle, updatefile , updatedesc);

      const Response = await axios.put(
        `http://localhost:5100/admin/updatealbum/${curAlbum}`,
        formData
      );
      if (Response.status == 200) {
        toast.success("Album Updated");
      }
    } catch (error) {
      console.log("Error while sending album ", error);
    }
  }

  return (
    <div className=" h-[100vh] flex justify-evenly items-center gap-12">
      <div className="shadow-2xl h-[600px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800 ">
        <h2 className="mt-9 text-2xl">Update Album</h2>

        <div className="h-[550px] w-[350px] mt-9 flex flex-col text-white">
          <p className="pl-5 my-3">Update Album Name</p>
          <input 
            className="p-2 mx-4 rounded-md text-black"
            type="text"
            placeholder="Enter Album Name"
            onChange={handleNameupdate}
            value={updatetitle}
          />
          <p className="pl-5 my-3">Add Album Decscption</p>
          <textarea
            className="p-2 mx-4 rounded-md text-black"
            onChange={(e) => {
              setupdatedesc(e.target.value);
            }}
            placeholder="Add Description"
            style={{ height: "100px", width: "320px" }}
          />
          <p className="pl-5 my-3">Add Album Image</p>
          <input
            className=" border border-white p-2 mx-4 rounded-md text-md "
            type="file"
            onChange={handleFileChange}
          />
          <button
            className=" p-2 mx-4 mt-5 rounded-md text-lg bg-red-400 border-none  hover:bg-red-500 transition-all ease-linear duration-200"
            onClick={handleUpdateAlbum}
          >
            Update Album
          </button>
        </div>
      </div>
      {toggle ? (
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
      ) : (
        <div className="shadow-2xl h-[800px] w-[750px] flex items-center flex-col  text-white rounded-lg bg-stone-800 scrollNone">
          <h2 className="mt-9 text-2xl">Album List</h2>
          <div className="flex flex-wrap justify-center w-[100%] h-[90%] gap-[2rem] mt-[10px] overflow-y-auto scrollNone">
            {albumList.map((item, index) => {
              return (
                <AlbumList
                  key={index}
                  title={item.title}
                  image={item.image}
                  id={item._id}
                  settoggle={settoggle}
                  // setsetidtoupdate={setsetidtoupdate}
                  setcurAlbum={setcurAlbum}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateAlbum;
