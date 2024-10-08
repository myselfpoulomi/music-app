import React, { useState, useEffect } from "react";
import { IoLogoHackernews } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
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
    else toast.warning("inert image only");
  };

  const handleAddArtist = async () => {
    if (name == "" || file == null) {
      toast.warning("put name and choose file");
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
      console.log(response);

      if (response.status == 200) {
        toast.success("Artist Added");
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
    else toast.warning("inert image only");
  };

  const handleUpdateArtist = async () => {
    const id = setidtoupdate;
    if (updatename == "" && updatefile == null) {
      toast.warning("put name and choose file");
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
        toast.success("Artist Updated");
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
        <h2 className="mt-9 text-2xl">{toggleInputs? "Update Artist" : "Add Artist"}</h2>

        {toggleInputs ? (
          <div className="h-[550px] w-[350px] mt-9 flex flex-col text-white">
            <p className="pl-5 my-3">Update Artist</p>
            <input
              className="p-2 mx-4 rounded-md text-black"
              type="text"
              placeholder="Enter Artist Name"
              onChange={handleNameupdate}
              value={updatename}
            />
            <p className="pl-5 my-3">Add Artist Image</p>
            <input
              className=" border border-white p-2 mx-4 rounded-md text-md "
              type="file"
              onChange={handleFileChangeupdate}
            />
            <button className=" p-2 mx-4 mt-5 rounded-md text-lg bg-red-400 border-none  hover:bg-red-500 transition-all ease-linear duration-200" onClick={handleUpdateArtist}>Update Artist</button>
          </div>
        ) : (
          <div className=" h-[550px] w-[350px] mt-9 flex flex-col text-white  ">
            <p className="pl-5 my-3">Add Artist Name</p>
            <input
              onChange={handleName}
              className="p-2 mx-4 rounded-md text-black "
              type="text"
              placeholder="Enter Artist Name"
            />
            <p className="pl-5 my-3">Add Artist Image</p>
            <input
              onChange={handleFileChange}
              className=" border border-white p-2 mx-4 rounded-md text-md "
              type="file"
            />

            <button
              className=" p-2 mx-4 mt-5 rounded-md text-lg bg-red-400 border-none hover:bg-red-500 transition-all ease-linear duration-200 "
              onClick={handleAddArtist}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <div className="shadow-2xl h-[800px] w-[750px] flex items-center flex-col  text-white rounded-lg bg-stone-800 scrollNone">
        <h2 className="mt-9 text-2xl">Update Artist</h2>
        <div className="flex flex-wrap justify-center w-[100%] h-[90%] gap-[2rem] mt-[10px] overflow-y-auto scrollNone">
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
