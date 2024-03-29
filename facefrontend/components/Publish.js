import React, {useEffect} from 'react';
import imgProfile from '../images/man.png';
import { useRef ,useState} from 'react';
import Modal from 'react-modal';
import { IoMdPhotos } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { addPost, selectPost } from "../public/src/features/postSlice";
import { setEmail } from '../public/src/features/loginSlice';
const Publish = ({ onClose }) => {
  const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post"; 
  const inputRef = useRef(null);
  const [userName, setUserName] = useState('');
  const userInfo = useSelector((state) => state.auth.userInfo);
  const hiddenFileInput = useRef(null);
  const [imageToPost,setImageToPost] = useState(null);
  const dispatch=useDispatch();
  const [showAlert, setShowAlert] = useState(false); // État pour gérer l'affichage de l'alerte
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  //const userName = useSelector((state) => state.auth.userName);
  const [email, setEmail] = useState('');
  useEffect(() => {
    // Récupérer le nom d'utilisateur depuis le localStorage
    const userNameFromLocalStorage = localStorage.getItem('firstName');
    const EmailFromLocalStorage = localStorage.getItem('userEmail');
    setUserName(userNameFromLocalStorage);
    setEmail(EmailFromLocalStorage);
    // console.log("❤❤❤ ",userNameFromLocalStorage)
  }, []);
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
  
    if (!inputRef.current.value && !imageToPost) {
      setShowAlert(true); // Affichez l'alerte si à la fois le champ texte et l'image sont vides
      return;
    }
    const formData = new FormData();

    formData.append("file", imageToPost);
    console.log("imagetopost: " + imageToPost);
    formData.append("post", inputRef.current.value);
    formData.append("name", userName);
    formData.append("email", email);
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
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const closeAlertModal = () => {
  //   setIsAlertModalOpen(false);
  //   setShowAlert(false);
  // };

  
    return (
      <div>
      
      <div className='modal-overlay'>
        <div className='modal w-2/4 h-3/4'>
      <div className="flex justify-between items-center"> {/* Utilisez flex pour aligner les éléments horizontalement */}
          <h1 className="text-2xl font-medium text-black my-4 flex-1"> {/* Utilisez flex-1 pour que le titre prenne l'espace restant */}
            Create Post
          </h1>
          <button className="text-gray-500 cursor-pointer " onClick={onClose}>&#10006;</button> {/* Bouton Close */}
        </div>
        {showAlert && (
          <div className="alert-modal bg-red-500 text-white rounded-md p-2">
            <p className="mb-1">You can&#39;t post an empty post.</p>
            <button
              onClick={() => setShowAlert(false)}
              className="bg-red-700 text-white px-2 rounded-lg"
            >
              OK
            </button>
          </div>
        )}
          <div className="border-t border-solid border-darkslategray my-4"></div>
          <textarea
          rows="4" // Définissez le nombre de lignes souhaité ici
          ref={inputRef}
          className='rounded-lg h-2/4 focus:outline-none font-medium bg-gray-100 px-4 w-full text-darkslategray text-xl'
          style={{ border: 'none', background: 'none' }}
          placeholder={`What’s in your mind, ${userName}?`}
        ></textarea>
          
          <form className="flex items-center">
          <div
            className='relative rounded-full h-12 focus:outline-none font-medium bg-gray-100 px-4 flex-1'
            onClick={handleClick}
            style={{ position: 'relative' }}
          >
            <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
              <IoMdPhotos className="text-blue-500" size={20} />
            </span>
            <p className="mt-2">add a picture to your post</p>
            
              
            
          </div>
          <input
            ref={hiddenFileInput}
            onChange={addImageToPost}
            type="file"
            accept="image/*"
            hidden
          />
          <button className=" text-blue-500 py-2 px-4  ml-2 " onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane} className="text-2xl"/></button>
        </form>
        
        {/* <form className="flex items-center">
          <div
            type="text"
            ref={inputRef}
            className='rounded-full h-12 focus:outline-none font-medium bg-gray-100 px-4 flex-1'
            placeholder="add to your post"
          >add a picture to your post</div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSubmit}>Post</button>
        </form> */}
            
          
          {/* {imageToPost && (
            <div className="my-2">
              <img
                src={imageToPost}
                alt="Selected Image"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )} */}
          
        </div>
        </div>
        </div>
    );
  };

export default Publish;
