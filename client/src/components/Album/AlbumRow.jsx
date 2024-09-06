import React , { useEffect, useState } from 'react'
import axios from "axios";

function AlbumRow() {
  const [albumlist, setalbumlist] = useState([]);
  useEffect(() => {
    async function getAllAlbumbs() {
      try {
        const response = await axios.get("http://localhost:5100/getallalbums");
        setalbumlist(response.data.albumList);
        console.log(response.data);
        
      } catch (error) {
        console.log("Error while fetching album list : ", error);
      }
    }
    getAllAlbumbs();
  }, []);
  return (
    <div className='h-[400px] p-[1rem] px-[3rem]'>
      <h2 className="text-white text-[35px] mb-9" >Albums</h2>
      <div className="flex gap-[0.1rem] pl-[40px] mt-[20px] h-[78%]">
        {albumlist.map((items, index) => {
          return (
            <div className='h-[280px] w-[280px] hover:bg-[rgba(31,18,18,0.252)] rounded-[10px] flex flex-col items-center justify-center  transition-all duration-700 ease-in-out hover:shadow-[rgba(0,0,0,0.3)]'> 
              <img
                className="h-[200px] w-[200px] object-cover rounded-[7px] mb-3 transform transition-transform duration-300 ease-in-out hover:scale-105 "
                src={items.image}
                alt=""
              />
              <p className="text-white text-[20px] text-center mt-[5px]">
                {items.title} 
              </p>
            </div>
          );
        })}
      </div>
      
    </div>
  )
}

export default AlbumRow