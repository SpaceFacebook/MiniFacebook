import React, { useRef, useState } from 'react';
import imgProfile from '../images/man.png';
import Image from 'next/image';
import { IoMdPhotos } from "react-icons/io";
import { useSession } from 'next-auth/react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch ,useSelector} from 'react-redux';
import axios from 'axios';

import { addPost, selectPost } from "../public/src/features/postSlice";
const CreatePost = () => {
  const {data: session } =useSession();
  const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post";
  const inputRef = useRef(null);
  const hiddenFileInput = useRef(null);
  const [imageToPost,setImageToPost] = useState(null);
  const dispatch=useDispatch();

  const userName = useSelector((state) => state.auth.userName);
  const email = useSelector((state) => state.auth.email);
  console.log("hi email from me: ",email)
  const handleClick = () => {
    hiddenFileInput.current.click();
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
              ref={inputRef}
              className='rounded-full h-12 focus:outline-none font-medium bg-gray-100 px-4 flex-1'
              placeholder={`What's on your mind, ${userName}?`}
            />
            <button hidden  onClick={handleSubmit}></button>
          </form>
          <div className="flex items-center space-x-1">
          
            <div
              onClick={handleClick}
              className="cursor-pointer hover:bg-gray-100 rounded-md p-1">
              <IoMdPhotos className="text-green-500" size={20} />
              <input
            ref={hiddenFileInput}
            onChange={addImageToPost}
            type="file"
            accept="image/*"
            hidden
          />
            </div>
          </div>
          </div>
          {imageToPost && (<div className='flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer'
           onClick={removeImage}><img src={imageToPost} alt='hhhhh' className='h-10 object-contain'/>
          <RiDeleteBin6Line className="h-8 hover:text-red-500" /></div>
          )}
          {console.log(imageToPost)}
        </div>
     
    </>
  );
}

export default CreatePost;
