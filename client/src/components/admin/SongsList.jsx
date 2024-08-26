import React from 'react'

function SongsList({title , id , setsetSongs}) {
  return (
    <div className='songListContainer'>
        
        <input type="checkbox" onClick={(e)=>{
          const status = e.target.checked;
          if (status) {
            setsetSongs ((prev)=>{
              return [...prev,id];
            })
          } else {
            setsetSongs((prev) => {
              return prev.filter((item) => item !== id);
            });
          }
          
        }} /> 
        <p>{title}</p>
        
    </div>
  )
}

export default SongsList