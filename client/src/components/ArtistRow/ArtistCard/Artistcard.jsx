import React from "react";
import "./Artistcard.css";

function Artistcard(item,index) {
  return <div className="artistcards">
    <img src={item.image} alt="" />
    <h5>{item.name}</h5>
    
  </div>
}

export default Artistcard;
