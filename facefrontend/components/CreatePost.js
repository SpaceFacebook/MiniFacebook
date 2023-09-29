import React, { useRef } from 'react';
import imgProfile from '../images/man.png';
import Image from 'next/image';
import { IoMdPhotos } from "react-icons/io";

const CreatePost = () => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <div className='bg-white rounded-md shadow-md text-gray-500 p-2'>
        <div className='flex p-4 space-x-2 items-center'>
          <Image
            src={imgProfile}
            height={40}
            width={40}
            className="rounded-full cursor-pointer"
          />
          <form className='flex flex-1'>
            <input
              type="text"
              className='rounded-full h-12 focus:outline-none font-medium bg-gray-100 px-4 flex-1'
              placeholder="What's on your mind?"
            />
          </form>
          <div className="flex items-center space-x-1">
            <input
              ref={hiddenFileInput}
              type="file"
              accept="image/*"
              hidden
            />
            <div
              onClick={handleClick}
              className="cursor-pointer hover:bg-gray-100 rounded-md p-1">
              <IoMdPhotos className="text-green-500" size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
