import React from 'react'
import './UpdateArtistCard.css'
import axios from 'axios';

function UpdateArtistcard({name,image,id}) {
  const handleDeleteArtist = async () => {
    // console.log(name);
    // console.log(id);
    try {
      const Response = await axios.delete (`http://localhost:5100/admin/deleteartist/${id}`);
      console.log(Response);
      if (Response.status==200) {
        alert("Artist Deleted Sucessfully");
      }
      
    }catch(error) {
      console.log(error);
      
    }

    
  }

  return (
    <div className='UpdateCardContainer'>
        <div className="imgofartist">
            <img src={image} alt="" />
            <h3>{name}</h3>
        </div>
        <div className="updatebtns">
            <button>Update</button>
            <button onClick={handleDeleteArtist}>Delete</button>
        </div>
    </div>
  )
}

export default UpdateArtistcard