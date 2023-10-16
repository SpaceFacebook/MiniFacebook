import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from '../images/logoMiniFacebook.png';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setLoggedOut } from '../public/src/features/loginSlice'
const Header = () => {
  const userName = useSelector((state) => state.auth.userName);
  const currentUserEmail=useSelector((state)=>state.auth.email);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
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
  const handleLogout = () => {
    // Effectuez ici les actions nécessaires pour la déconnexion, par exemple, vider le state Redux, supprimer les cookies de session, etc.
    dispatch(setLoggedOut());
    router.push('/login'); // Redirigez l'utilisateur vers la page de connexion après la déconnexion.
  };
  return (
    <div className="bg-white p-2 shadow-md top-0 sticky z-50 h-16 flex justify-between items-center">
      <div className="flex">
        <Image src={logo} height={100} width={260} onClick={handlePagehome} alt="image logo" />
      </div>
      <div className="flex items-center space-x-2 relative">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div
              className="relative inline-block group"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <Image
                src={profileImage}
                height={40}
                width={40}
                className="object-cover rounded-full cursor-pointer"
                onClick={handleProfil}
                alt="image profile"
              />
              {dropdownVisible && (
                <div className="absolute top-10 right-0 bg-white shadow-md py-2 px-4 rounded-md space-y-2 w-48">
                  <a
                    onClick={handleProfil}
                    className="block text-gray-700  hover:bg-gray-100"
                  >
                    Your Profile
                  </a>
                  <a
                    onClick={handleLogout}
                    className="block text-gray-700  hover:bg-gray-100"
                  >
                    sign out
                  </a>
                </div>
              )}
            </div>
            <span className="font-bold ml-2">{userName}</span>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
