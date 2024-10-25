import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlayList() {
  const navigate = useNavigate();
  async function handleCreatePlaylist() {
    try {
      const playlistName = `Playlist#${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      const { data } = await axios.post(
        `http://localhost:5100/user/create-playlist`,
        { name: playlistName },
        { withCredentials: true }
      );
      navigate(`/playlist/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center flex-col items-center ">
      <div className="w-[90%] h-[150px] mt-[20px] rounded-md bg-teal-950 pl-[20px] pt-[20px] align-middle text-white">
        <h1 className="pb-[10px]">Create your first playlist here!</h1>
        <button
          className="bg-black p-[7px] rounded-full h-[40px] w-[150px]"
          onClick={handleCreatePlaylist}
        >
          Create Playlist
        </button>
      </div>
      <div className="w-[90%] h-[150px] mt-[20px] rounded-md bg-teal-950 pl-[20px] pt-[20px] align-middle text-white">
        <h1 className="pb-[10px]">
          Let's browse some of your favourite artists..!
        </h1>
        <button className="bg-black p-[7px] rounded-full h-[40px] w-[150px]">
          Browse Artist
        </button>
      </div>
    </div>
  );
}

export default PlayList;
