import React from 'react'

function SongsList({title , id , setsetSongs , curSong}) {
  return (
    <div className=' w-[350px] mt-9 flex flex-row gap-4 items-center'>
        
        <input className="appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-white" type="checkbox" onClick={(e)=>{
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
        <p className="text-[20px]">{title}</p>
        
    </div>
  )
}

export default SongsList