import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import Information from "./Information";
import Posts from './Posts'
import CreatePost from "./CreatePost";
import Photos from "./Photos";
import { requireAuth } from "../auth/customRouter";
import { useDispatch } from "react-redux";
import {setUserInfo,setFirstName,setSurName, setUserName} from '../public/src/features/loginSlice';
const Profile = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const userInfo=useSelector((state)=>state.auth.userInfo);
  const dispatch=useDispatch();
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userEmail = localStorage.getItem('userEmail');
      setCurrentUserEmail(userEmail);
      if(currentUserEmail){
    const USER_INFO_URL = `http://localhost:8080/api/userInfo?userEmail=${currentUserEmail}`;
    // const params = {userEmail:currentUserEmail}
    axios
      .get(USER_INFO_URL)
      .then((response) => {
        dispatch(setUserInfo(response.data));
        //dispatch(setFirstName(userInfo.firstName));
        dispatch(setSurName(userInfo.surName));
        //dispatch(setUserName(userInfo.firstName))
        setCoverImage(response.data.coverImage);
        setProfileImage(response.data.profileImage);
        
        setIsLoading(false);
        console.log("image ",response.data.profileImage)
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
        setIsLoading(false);
      });
    }
  }
  }, [currentUserEmail]);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("coverImage", file);
      formData.append("userEmail", currentUserEmail);

      axios
        .post("http://localhost:8080/api/updateCoverImage", formData)
        .then((response) => {
          // Update the cover image in the state
          setCoverImage(URL.createObjectURL(file));
        })
        .catch((error) => {
          console.error("Error updating cover photo:", error);
        });
    }
  };
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      formData.append("userEmail", currentUserEmail);

      axios
        .post("http://localhost:8080/api/updateProfileImage", formData)
        .then((response) => {
          setProfileImage(URL.createObjectURL(file));
        })
        .catch((error) => {
          console.error("Error updating profile photo:", error);
        });
    }
  };

  
    return (
      <div className="bg-white w-[500px] h-[2873px] overflow-hidden text-left text-10xl text-black font-inter bg-{}">
       {isLoading ? (
  <div>Loading...</div>
) : (
  <Image
    className="absolute top-[16px] left-[0px] w-full h-[400px] object-cover"
    src={coverImage}
    width={400}
    height={200}
    alt="image de coverture"
  />
)}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <button
        className="absolute top-[360px] left-[1200px] w-[170px] h-[40px] object-cover bg-gray-600 rounded-xl text-white cursor-pointer"
        onClick={() => {
          // Trigger the file input when the button is clicked
          document.getElementById("fileInput").click();
        }}
      >
        <FontAwesomeIcon icon={faCameraRetro} className="w-[25px] h-[25px] text-white" />
        <strong>Edit cover photo</strong>
      </button>

        <div className="absolute top-[452px] left-[271px] text-[30px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
        {userInfo?.firstName} {userInfo?.surName}
        </div>
        <div className="absolute top-[550px] left-[58px]   w-[1280px] border-b border-gray-500"></div>
        <div className="absolute top-[566px] left-[58px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65] border-b border-gray-600">
          Posts
        </div>
        <div className="absolute top-[566px] left-[296px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
          About
        </div>
        {isLoading ? (
  <div>Loading...</div>
) : (
  
          <Image
    className="absolute top-[354px] left-[90px] w-[160px] h-[156px] object-cover rounded-full"
    src={profileImage}
    width={160}
    height={156}
    alt="image de profile"
  />
        )
}
      <input
        type="file"
        id="profileImageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleProfileImageChange}
      />

      <button
        className="absolute top-[460px] left-[216px] w-[40px] h-[40px] object-cover rounded-full bg-gray-600"
        onClick={() => {
          document.getElementById("profileImageInput").click();
        }}
      >
        <FontAwesomeIcon icon={faCameraRetro} className="w-[25px] h-[25px] text-white" />
      </button>
          <div>
          <Information/>
          <Photos/>
          <div className='bg-slate-100 shadow-lg  absolute top-[650px] left-[600px] rounded-md p-4 w-[600px] '>
            {/* <CreatePost/> */}
            <Posts  userPerformed={true}/>
          </div>
          
          </div>
      </div>
    );
  };
  
  export default requireAuth(Profile);
  