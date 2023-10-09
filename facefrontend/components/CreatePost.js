import React, { useRef, useState } from 'react';
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
 
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.post.isOpen);
  const inputRef = useRef(null);
  const userName = useSelector((state) => state.auth.userName);

  const email = useSelector((state) => state.auth.email);
  console.log("hi email from me: ",userName)
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleInputChange = () => {
    // Mettez ici votre logique pour déterminer quand afficher le composant
    dispatch(openModal());
      
    console.log(isOpen)
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        setImageToPost(e.target.result);
      };
    }
  };
  const removeImage = () => {
    setImageToPost(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    const formData = new FormData();

    formData.append("file", imageToPost);
    console.log("imagetopost: " + imageToPost);
    formData.append("post", inputRef.current.value);
    formData.append("name", userName);
    formData.append("email", email);
    console.log("emaillllllll hi : ",email)
    formData.append("image", imageToPost);
    formData.append("profilePic", imgProfile);

    axios
      .post(FACEBOOK_CLONE_ENDPOINT, formData, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        inputRef.current.value = "";
        dispatch(addPost(response.data));
        console.log(response.data);
        removeImage();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => {
    dispatch(closeModal()); // Utilisez l'action closeModal pour fermer Publish
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