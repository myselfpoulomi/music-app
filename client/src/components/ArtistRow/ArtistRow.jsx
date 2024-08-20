import React from 'react'
import './ArtistRow.css'
import Artistcard from './ArtistCard/Artistcard'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function ArtistRow() {
  return (
    <div className='ArtistRow'>
        <div className='headingForArtist'>
            <h2>Popular Artist</h2>
            <p className='arrows'><FaArrowLeft /><FaArrowRight /></p>
        </div>
        <div className='ArtistProfile'>
            <Artistcard />
            <Artistcard />
            <Artistcard />
            <Artistcard />
        </div>
    </div>
  )
}

export default ArtistRow