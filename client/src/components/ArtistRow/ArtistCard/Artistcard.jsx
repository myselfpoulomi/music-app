import React from "react";
import "./Artistcard.css";

function Artistcard({name,image}) {
  return <div className="artistcards">
    <img src={image} alt="" />
    <h5>{name}</h5>
    
  </div>
}

export default Artistcard;
