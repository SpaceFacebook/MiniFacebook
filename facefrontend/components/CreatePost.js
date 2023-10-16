import React, { useRef, useState, useEffect } from 'react';
import imgProfile from '../images/man.png';
import Image from 'next/image';
import { IoMdPhotos } from "react-icons/io";
import { useSession } from 'next-auth/react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../public/src/features/postSlice';
import axios from 'axios';


import { addPost, selectPost } from "../public/src/features/postSlice";
import Publish from './Publish';

const CreatePost = () => {
  //const {data: session } =useSession();
  const currentUserEmail=useSelector((state)=>state.auth.email);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.post.isOpen);
  const inputRef = useRef(null);
  const userName = useSelector((state) => state.auth.userName);

  const email = useSelector((state) => state.auth.email);
  const handleInputChange = () => {
    // Mettez ici votre logique pour déterminer quand afficher le composant
    dispatch(openModal());
      
    console.log(isOpen)
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  const handleClose = () => {
    dispatch(closeModal()); // Utilisez l'action closeModal pour fermer Publish
  };
  useEffect(() => {
    const USER_INFO_URL = `http://localhost:8080/api/userInfo?userEmail=${currentUserEmail}`;

    axios
      .get(USER_INFO_URL)
      .then((response) => {
        setProfileImage(response.data.profileImage);
        setIsLoading(false);
        // console.log("userInfo: ",userInfo)
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
        setIsLoading(false);
      });
  }, [currentUserEmail]);
  return (
    <>
      <div className='bg-white rounded-md shadow-md text-gray-500 p-2'>
        <div className='flex p-4 space-x-2 items-center'>
          {isLoading ? (
  <div>Loading...</div>
) : (
 
  <Image
    src={profileImage}
    height={40}
    width={40}
    className="object-cover rounded-full"
    alt="image profile"
  />
  )}
          
               <form className='flex flex-1' onClick={handleInputChange}>
            <input
              type="text"
             
              className='rounded-full h-12 focus:outline-none font-medium bg-gray-100 px-4 flex-1'
              placeholder={`What's on your mind, ${userName}?`}
            />
            
          </form>
          <div className="flex items-center space-x-1">
          
            <div
              
              className="cursor-pointer hover:bg-gray-100 rounded-md p-1">
              <IoMdPhotos className="text-green-500" size={20} />
              
            </div>
          </div>
          </div>
          {isOpen &&  <Publish  onClose={handleClose}/>}
        </div>
     
    </>
  );
}

export default CreatePost;