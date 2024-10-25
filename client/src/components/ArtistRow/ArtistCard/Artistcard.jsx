import React, { useState } from "react";
import "./Artistcard.css";
import { useNavigate } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";

function Artistcard({ item }) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  return (
    <div
    onMouseEnter={() => setToggle(true)}
    onMouseLeave={() => setToggle(false)}
      onClick={() => {
        navigate(`/artist/${item._id}`);
      }}
      className="artistcards"
    >
      <img src={item.image} alt="" />
      <FaCirclePlay
        className="transtoin-all h-[50px] w-[50px] absolute    z-1 bottom-2 right-2  transition-transform duration-150 ease-in-out hover:scale-110 text-[20px] text-teal-700  rounded-full bg-transparent"
        style={{
          opacity: toggle ? 1 : 0,
          top: "65%",
          left: "80%",
          transform: "translate(-50%, -50%)"
        }}/>
      <h5>{item.name}</h5>
    </div>
  );
}

export default Artistcard;
