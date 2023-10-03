import React from 'react';
import imgProfile from '../images/man.png';
import Image from 'next/image';
import { useRef ,useState} from 'react';
import { IoMdPhotos } from "react-icons/io";
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { addPost, selectPost } from "../public/src/features/postSlice";
const Publish = () => {
    const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post";
    
  const inputRef = useRef(null);
  const hiddenFileInput = useRef(null);
  const [imageToPost,setImageToPost] = useState(null);
  const dispatch=useDispatch();

  const userName = useSelector((state) => state.auth.userName);
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
    formData.append("email", "kaoutar@gmail.com");
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
        
      <div className="bg-white min-h-screen flex flex-col items-center justify-center modal">
        <div className="bg-white shadow-md w-full md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] p-4 rounded-lg mt-8">
          <h1 className="text-4xl font-medium text-black text-center my-4">
            Create Post
          </h1>
          <div className="border-t border-solid border-darkslategray my-4"></div>
          <div className="text-darkslategray text-2xl my-4">
            What’s in your mind, Kaoutar?
          </div>
          <form>
          <input
              type="text"
              ref={inputRef}
              className='rounded-full h-12 focus:outline-none font-medium bg-gray-100 px-4 flex-1'
              placeholder={`What's on your mind, ${userName}?`}
            />
            <button hidden  onClick={handleSubmit}></button>
          </form>
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
            
          
          {imageToPost && (
            <div className="my-4">
              <img
                src={imageToPost}
                alt="Selected Image"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

export default Publish;
