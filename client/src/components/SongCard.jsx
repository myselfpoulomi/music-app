import React, { useRef, useState } from "react";
import { GoHeart } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

// Function to generate random song data
const getRandomSongData = () => {
  const randomTitles = ["Song A", "Song B", "Song C", "Song D"];
  const randomArtists = ["Artist 1", "Artist 2", "Artist 3"];
  const randomImages = [
    "https://via.placeholder.com/50",
    "https://via.placeholder.com/50/0000FF",
    "https://via.placeholder.com/50/008000"
  ];
  return {
    title: randomTitles[Math.floor(Math.random() * randomTitles.length)],
    artist: {
      name: randomArtists[Math.floor(Math.random() * randomArtists.length)]
    },
    image: randomImages[Math.floor(Math.random() * randomImages.length)],
    song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Example song URL
  };
};

function SongCard({ item, number }) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(null);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // If item is not provided or has missing properties, use random data
  const songData = item || getRandomSongData();

  return (
    <div className="h-[70%] ml-[40px]">
      <audio
        className="hidden"
        ref={audioRef}
        src={songData.song}
        onLoadedMetadata={handleLoadedMetadata}
        controls
      />
      <div className="ml-[20px] flex justify-between">
        <div className="flex min-w-[250px] items-center mb-[10px]">
          <p className="text-white text-[15px] w-[20px] mr-[20px]">{number}</p>
          <img
            className="h-[50px] w-[50px] rounded-[5px] mr-[10px]"
            src={songData.image}
            alt={songData.title}
          />
          <p className="text-white text-[15px]">{songData.title}</p>
        </div>
        <div className="flex items-center text-white">
          <p>{songData.artist && songData.artist.name}</p>
        </div>
        <div className="text-white flex items-center justify-around w-[250px] mr-[30px]">
          <GoHeart />
          <p>
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </p>
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
}

export default SongCard;
