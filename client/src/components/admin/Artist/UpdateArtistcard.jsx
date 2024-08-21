import React from 'react'
import './UpdateArtistCard.css'

function UpdateArtistcard() {
  return (
    <div className='UpdateCardContainer'>
        <div className="imgofartist">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRki9ocg_GKb2On1x-Yf5Hpn4mrnMtF0N3B8A&s" alt="" />
        </div>
        <div className="updatebtns">
            <button>Update</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default UpdateArtistcard