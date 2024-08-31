import React from "react";

function AddSong() {
  return (
    <div className=" h-[100vh] flex justify-evenly items-center gap-12 ">
      <div className="shadow-2xl h-[600px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800 ">
        <h2 className="mt-9 text-2xl">Add New Song</h2>
        <div className=" h-[550px] w-[350px] mt-9 flex flex-col text-white ">
          <p className="pl-5 my-3">Add Song Name</p>
          <input
            className="p-2 mx-4 rounded-md "
            type="text"
            placeholder="Enter Song Name"
          />
          <p className="pl-5 my-3">Add Song Image</p>
          <input
            className=" border border-white p-2 mx-4 rounded-md text-md "
            type="file"
          />
          <p className="pl-5 my-3">Add Song</p>
          <input
            className=" border border-white p-2 mx-4 rounded-md text-md "
            type="file"
            accept=".mp3"
          />

          <button className=" p-2 mx-4 mt-5 rounded-md text-lg bg-red-400 border-none ">
            Submit
          </button>
        </div>
      </div>
      <div className="shadow-2xl h-[600px] w-[400px] flex items-center flex-col  text-white rounded-lg bg-stone-800 ">
          <h2 className="mt-9 text-2xl">Artist List</h2>
          <div className=" w-[350px] mt-9 flex flex-row gap-4 ">
          <input type="checkbox" className="" />
          <p>Arijit Shingh</p>
          </div>
          <div className=" w-[350px] mt-9 flex flex-row gap-4 ">
          <input type="checkbox" className="" />
          <p>Arijit Shingh</p>
          </div>
          <div className=" w-[350px] mt-9 flex flex-row gap-4 ">
          <input type="checkbox" className="" />
          <p>Arijit Shingh</p>
          </div>
        </div>
    </div>
  );
}

export default AddSong;
