import React, { useState, useRef } from "react";

const MusicPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    console.log(audioRef.current.currentTime);
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    audio.currentTime = (event.target.value / 100) * duration;
    setCurrentTime(audio.currentTime);
  };

  return (
    <div className="mx-auto bg-gray-800 text-white p-4 rounded-lg shadow-lg fixed bottom-0 w-[100%]">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={togglePlayPause}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="text-sm">
          <span>
            {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")}
          </span>{" "}
          /
          <span>
            {" "}
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </span>
        </div>
      </div>
      <input
        type="range"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default MusicPlayer;