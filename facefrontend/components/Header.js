import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from '../images/logoMiniFacebook.png';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const Header = () => {
  const userName = useSelector((state) => state.auth.userName);
  const currentUserEmail=useSelector((state)=>state.auth.email);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleProfil=()=>{
    router.push('/profil');
  }

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
  const handlePagehome=()=>{
    router.push('/home');
  }
  return (
    <div className="bg-white p-2 shadow-md top-0 sticky z-50 h-16 flex justify-between items-center">
      <div className="flex">
        <Image src={logo} height={100} width={260}  onClick={handlePagehome}/>
      </div>
      <div className="flex items-center space-x-2">
      {isLoading ? (
  <div>Loading...</div>
) : (
 
  <Image
    src={profileImage}
    height={40}
    width={40}
    className="object-cover rounded-full"
    onClick={handleProfil}
  />
  )}
  <span className="font-bold ml-2">{userName}</span>
</div>
</div>
  );
};

export default Header;
