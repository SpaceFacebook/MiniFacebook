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
const Profile = () => {
  const currentUserEmail = useSelector((state) => state.auth.email);
  const [userInfo, setUserInfo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const USER_INFO_URL = `http://localhost:8080/api/userInfo?userEmail=${currentUserEmail}`;

    axios
      .get(USER_INFO_URL)
      .then((response) => {
        setUserInfo(response.data);
        setCoverImage(response.data.coverImage);
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
      <div className="bg-white w-[500px] h-[2873px] overflow-hidden text-left text-10xl text-black font-inter bg-{}">
        {/* <img
          className="absolute top-[145px] left-[0px] w-[1848px] h-[545px] object-cover"
          alt=""111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111§
          src={Image}
        /> */}
       {isLoading ? (
  <div>Loading...</div>
) : (
  <Image
    className="absolute top-[16px] left-[0px] w-full h-[400px] object-cover"
    src={coverImage}
    width={400}
    height={200}
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
        <div className="absolute top-[566px] left-[158px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
          Photos
        </div>
        <div className="absolute top-[566px] left-[296px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
          About
        </div>
        <div className="absolute top-[566px] left-[396px] tracking-[-0.02em] leading-[142.02%] font-medium opacity-[0.65]">
          Comments
        </div>
        {/* <img
          className="absolute top-[54px] left-[1688px] w-[59px] h-[59px] object-cover"
          alt=""
          src="/3135823-4@2x.png"
        /> */}
        {/* <img
          className="absolute top-[603px] left-[90px] w-[200px] h-[196px] object-cover"
          alt=""
          src="/3135823-5@2x.png"
        /> */}
        {/* <Image
        className="absolute top-[354px] left-[90px] w-[160px] h-[156px] object-cover rounded-full"
        src={profileImage ? profileImage : Image2}
        width={160}
        height={156}
      /> */}
        {isLoading ? (
  <div>Loading...</div>
) : (
  
          <Image
    className="absolute top-[354px] left-[90px] w-[160px] h-[156px] object-cover rounded-full"
    src={profileImage}
    width={160}
    height={156}
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
          <Information  userInfo={userInfo}/>
          <div className=' shadow-md bg-red-500  absolute top-[1060px] left-[58px] rounded-md p-4 w-[400px] h-[50px]'>Photos</div>
          <Photos/>
          <div className='bg-slate-400 shadow-lg  absolute top-[650px] left-[600px] rounded-md p-4 w-[600px] '>
            <CreatePost/>
            <Posts currentUserEmail={currentUserEmail} userPerformed={true}/>
          </div>
          
          </div>
      </div>
    );
  };
  
  export default requireAuth(Profile);
  