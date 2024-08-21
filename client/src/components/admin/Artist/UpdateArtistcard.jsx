import React from 'react'
import './UpdateArtistCard.css'

function UpdateArtistcard(item,index) {
  return (
    <div className='UpdateCardContainer'>
        <div className="imgofartist">
            <img src={item.image} alt="" />
            <h3>{item.name}</h3>
        </div>
        <div className="updatebtns">
            <button>Update</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default UpdateArtistcard