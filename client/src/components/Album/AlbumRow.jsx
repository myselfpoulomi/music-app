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
      <div className="flex gap-[2rem]">
        {albumlist.map((items, index) => {
          return (
            <div>
              <img
                className="h-[210px] w-[210px] object-cover rounded-[7px] mb-8 "
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