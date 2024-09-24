import React from "react";
import "./Artistcard.css";
import { useNavigate } from "react-router-dom";

function Artistcard({ item }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/artist/${item._id}`);
      }}
      className="artistcards"
    >
      <img src={item.image} alt="" />
      <h5>{item.name}</h5>
    </div>
  );
}

export default Artistcard;
