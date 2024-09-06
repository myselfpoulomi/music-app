import React from "react";

function UpdateSongCard({ name, image, setcurSong,id ,settoggle }) {
  return (
    <div className="w-[300px] flex flex-col items-center justify-center">
      <div className=" w-[300px]  flex flex-col items-center">
        <img
          className="h-[370px] w-[300px] object-cover rounded-lg"
          src={image}
          alt=""
        />
        <h3 className="mt-[10px] text-[20px] font-bold">{name}</h3>
      </div>
      <div className="mt-[10px] flex h-[50px] w-[300px] gap-3">
        <button
          className="bg-emerald-500 p-2 w-[50%] rounded-lg text-[20px] hover:bg-emerald-700 transition-all ease-linear duration-200"
          onClick={() => {
            setcurSong(id);
            settoggle(true);
          }}
        >
          Update
        </button>
        <button className="bg-red-400 p-2 w-[50%] rounded-lg  text-[20px] hover:bg-red-500 transition-all ease-linear duration-200">
          Delete
        </button>
      </div>
    </div>
  );
}

export default UpdateSongCard;
