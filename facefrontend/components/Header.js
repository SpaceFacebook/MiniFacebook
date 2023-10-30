import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from '../images/logo11.png';
import { useSelector,useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import logochat from '../images/logochatbot1.png'
import { setshowChatBot } from '../public/src/features/postSlice';
import { setLoggedOut,setUserName } from '../public/src/features/loginSlice';

const Header = () => {
  // const userName = useSelector((state) => state.auth.userName);
  const router = useRouter();
  const showChatBot=useSelector((state)=>state.post.showChatBot);
  const dispatch=useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const currentUserEmail=useSelector((state)=>state.auth.email);
  // const [userName, setUserName] = useState('');
  const userName = useSelector((state) => state.auth.userName);
  const handleshowchat = () => {
    // Définissez l'état pour afficher ou masquer le Chatbot
    dispatch(setshowChatBot(!showChatBot));
  }
  const handleProfil=()=>{
    router.push('/profil');
  }
  const handlePagehome=()=>{
    router.push('/home');
  }
  const handleLogout = () => {
    // Effectuez ici les actions nécessaires pour la déconnexion, par exemple, vider le state Redux, supprimer les cookies de session, etc.
    dispatch(setLoggedOut());
    // Mettez à jour la variable `isLoggedIn` dans le localStorage
  localStorage.setItem('isLoggedIn', 'false'); // Définissez la valeur sur 'false'

    router.push('/login'); // Redirigez l'utilisateur vers la page de connexion après la déconnexion.
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        const USER_INFO_URL = `http://localhost:8080/api/userInfo?userEmail=${userEmail}`;

        axios
          .get(USER_INFO_URL)
          .then((response) => {
            setProfileImage(response.data.profileImage);
            // setUserName(response.data.firstName)
            dispatch(setUserName(response.data.firstName));
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching user information:', error);
            setIsLoading(false);
          });
      }
    }
  }, []);
  return (
    <div className="bg-blue-500 p-2 shadow-md top-0 sticky z-50 h-16 flex justify-between items-center">
      <div className="flex">
        <Image src={logo} height={100} width={260}  onClick={handlePagehome}/>
      </div>
      <div className="flex  items-center space-x-2">
      {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
           <div onClick={()=>handleshowchat()} className="flex items-center">
       <div style={{ width:'45px',height:'20px', marginBottom:"20px"}}>
    <Image src={logochat} alt="logochat" onClick={() => handleshowchat()} />
  </div></div>
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
            <span className="font-bold ml-2 text-white">{userName}</span>
           
          </>
        )}
</div>
</div>
  );
};

export default Header;