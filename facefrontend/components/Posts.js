import React ,{ useState, useEffect } from 'react'
import Post from './Post'
import { useDispatch ,useSelector} from 'react-redux';
import { addAllPost, selectPost } from "../public/src/features/postSlice";
import axios from 'axios';
import logochat from '../images/iconchatbot.svg'
import Image from 'next/image';
import {setShowChatBotSection} from "../public/src/features/postSlice"
import Chatbot from './chatbot';
const Posts = ({ currentUserEmail,userPerformed }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  const [userPosts, setUserPosts] = useState([]);
  const [showChatBot, setShowChatBot] = useState(false); // État pour gérer la visibilité du Chatbot

 
  const handleshowchat = () => {
    // Définissez l'état pour afficher ou masquer le Chatbot
    setShowChatBot(!showChatBot);
  };
  useEffect(() => {
    const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post";
    const fetchData = () => {
      const response = axios
        .get(FACEBOOK_CLONE_ENDPOINT)
        .then((response) => {
          console.log(response.data);
          dispatch(addAllPost(response.data));
          
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    };

    if (userPerformed) {
      // Exécutez cet effet pour récupérer les posts d'un utilisateur spécifique
       // Remplacez par l'email de l'utilisateur spécifique
       const USER_SPECIFIC_URL = `http://localhost:8080/api/v1/post/api/postUser?userEmail=${currentUserEmail}`;

      axios.get(USER_SPECIFIC_URL)
        .then((response) => {
          console.log( "reponse: ",response.data);
          setUserPosts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user-specific posts:', error);
        });
    } else {
      // Exécutez cet effet pour récupérer tous les posts
      fetchData();
    }
  }, [dispatch, userPerformed]);

  return (
    <div>
      {userPerformed ? (
        userPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      )}
       <div className="fixed bottom-10 right-10 w-30 h-30" onClick={()=>handleshowchat()}>
       <div style={{ position: 'fixed', bottom: '400px', right: '20px' }}>
    <Image src={logochat} alt="logochat" onClick={() => handleshowchat()} />
  </div>
      </div>
      {showChatBot && <Chatbot />}
    
    </div>
  );
};

export default Posts