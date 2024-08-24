import React from 'react'

function SongsList({title}) {
  return (
    <div className='songListContainer'>
        
        <input type="checkbox" /> 
        <p>{title}</p>
        
    </div>
  )
}

export default SongsList