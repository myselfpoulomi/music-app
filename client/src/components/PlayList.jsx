import PlaylistPreview from '@/pages/PlaylistPreview';
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';

function PlayList() {
  const navigate=useNavigate();
  return (
    <div className='flex justify-center flex-col items-center '>
      {/* <Routes>
        <Route path="/playlist/*" element={<PlaylistPreview />} />
        <Routes /> */}
     
        <div className='w-[90%] h-[150px] mt-[20px] rounded-md bg-teal-950 pl-[20px] pt-[20px] align-middle text-white'>
            <h1 className='pb-[10px]'>Create your first playlist here!</h1>
            <button className='bg-black p-[7px] rounded-full h-[40px] w-[150px]'
            onClick={()=> {
              navigate("/playlist/*");
            }}
            
             
            
            >Create Playlist</button>

        </div>
        
       
        
        <div className='w-[90%] h-[150px] mt-[20px] rounded-md bg-teal-950 pl-[20px] pt-[20px] align-middle text-white'>
            <h1 className='pb-[10px]'>Let's browse some of your favourite artists..!</h1>
            <button className='bg-black p-[7px] rounded-full h-[40px] w-[150px]'>Browse Artist</button>
        </div>
         
        {/* <Routes>
        <Route path="/playlist/*" element={<PlaylistPreview />} />
        <Routes /> */}
    </div>
 
  )
}

export default PlayList