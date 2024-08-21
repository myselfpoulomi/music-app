import React from 'react'
import './UpdateArtistCard.css'

function UpdateArtistcard({name,image}) {
  return (
    <div className='UpdateCardContainer'>
        <div className="imgofartist">
            <img src={image} alt="" />
            <h3>{name}</h3>
        </div>
        <div className="updatebtns">
            <button>Update</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default UpdateArtistcard