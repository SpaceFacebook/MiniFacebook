import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Image from 'next/image';
import {setShowCommentSection} from "../public/src/features/postSlice"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CommentSection from './CommentSection';
import { FaComment } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons';
const Post = ({ post }) => {
  const [reactionType, setReactionType] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePostId, setActivePostId] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const showCommentSection = useSelector((state) => state.post.showCommentSection);
  // const email=useSelector((state)=>state.auth.email);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const dispatch = useDispatch();
  const handleCommentButtonClick = async(postId) => {
    if (postId === activePostId) {
      setActivePostId(null);
      await fetchCommentCount(postId);
    } else {
      setActivePostId(postId);
    }
    dispatch(setShowCommentSection());
  };
  const handleDeletePost = async (postId) => {
    // Vérifiez si l'utilisateur est l'auteur de la publication
    if (post.email === currentUserEmail) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/post/deletePost/${postId}?userEmail=${currentUserEmail}`, {
          method: 'DELETE',
        });
  
        if (response.status === 200) {
          setIsDeleted(true);
          console.log('Publication supprimée avec succès');
        } else {
          console.error('Échec de la suppression de la publication');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de la publication : ', error);
      }
    } else {
      console.error('Vous n\'êtes pas autorisé à supprimer cette publication.');
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userEmail = localStorage.getItem('userEmail');
      setCurrentUserEmail(userEmail);
    fetchCommentCount(post.id);
    const interval = setInterval(() => {
      fetchCommentCount(post.id);
      }, 1000);
    return () => clearInterval(interval);
  }}, [post.id]);
  const handleReactionClick = async (postId, reactionType) => {
    try {
      const userEmail = currentUserEmail; // Récupérez l'email de l'utilisateur
      if (userEmail) {
        console.log("user email envoyer est: ",userEmail)
        const reactionData = {
          user: userEmail,
          reactionType: reactionType,
        };
        
        const response = await fetch(`http://localhost:8080/api/reaction/${postId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reactionData),
        });
  
        if (response.status === 200) {
          setReactionType(reactionType);
          console.log('Réaction enregistrée avec succès');
          fetchReactionCount();
          localStorage.setItem(`userReaction-${postId}`, reactionType);
        } else {
          console.error('Échec de l\'enregistrement de la réaction');
        }
      } else {
        console.error('L\'email de l\'utilisateur est nul.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la réaction : ', error);
    }
  };
  
  // const handleReactionClick = async (postId, reactionType) => {
  //   try {
  //     const reactionData = {
  //       user: { email: currentUserEmail },
  //       reactionType: reactionType,
  //     };
  //     if(reactionData.user.email){
  //     const response = await fetch(`http://localhost:8080/api/reaction/${postId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(reactionData),
  //     });
  //   }

  //       if (response.status === 200) {
  //         setReactionType(reactionType);
  //         console.log('Réaction enregistrée avec succès');
  //         fetchReactionCount();
  //       } else {
  //         console.error('Échec de l\'enregistrement de la réaction');
  //       }
      
  //     } catch (error) {
  //       console.error('Erreur lors de l\'enregistrement de la réaction : ', error);
  //     }
    
  // };
  // Fonction pour obtenir le nombre de commentaires pour le poste
  const fetchCommentCount = async (postId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/commentaires/post/${postId}/commentCount`);
        if (response.status === 200) {
            const data = await response.json();
            setCommentCount(data);
        }
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de commentaires : ', error);
    }
  };
  const fetchReactionCount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reaction/${post.id}/reaction-count`);
      if (response.status === 200) {
        const data = await response.json();
        setLikeCount(data.like);
        setDislikeCount(data.dislike);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de réactions : ', error);
    }
  };
  useEffect(() => {
    const USER_INFO_URL = `http://localhost:8080/api/userInfo?userEmail=${post.email}`;

    axios
      .get(USER_INFO_URL)
      .then((response) => {
        setProfileImage(response.data.profileImage);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
        setIsLoading(false);
      });
  }, [post.email]);
  useEffect(() => {
    fetchReactionCount();
  }, []);
  useEffect(() => {
    const userReaction = localStorage.getItem(`userReaction-${post.id}`);
    if (userReaction) {
      setReactionType(userReaction);
    }
  }, [post.id]);

  return isDeleted ? null : (
    <div className='flex flex-col' key={post.id}>
      <div className='bg-white mt-6 rounded-md p-4 relative'>
        <div className="flex items-center space-x-2 ">
        {isLoading ? (
  <div>Loading...</div>
) : (
 
  <Image
    src={profileImage}
    height={40}
    width={40}
    className="object-cover rounded-full"
    alt="image profile"
  />
  )}
          <div>
            <p className='font-medium'>{post.name}</p>
            <p className="text-xs text-gray-500">{post.timeStamp}</p>
          </div>
          <div className="flex justify-end w-full">
    <button
      onClick={toggleMenu}
      className="absolute text-gray-500 hover:text-gray-700 cursor-pointer"
    >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          {isMenuVisible && (
              <div className="relative top-12 right-0 bg-white shadow-md py-2 px-4 rounded-md space-y-2 w-48 menu-dropdown">
                {post.email === currentUserEmail && ( 
              <button
                onClick={() => handleDeletePost(post.id)}
                className='text-gray-500'
              >
                <FontAwesomeIcon icon={faTrash} />
                Remove
              </button>
            )}
              </div>
            )}
        </div>
        </div>
        <div>
          <p className='py-4'>{post.post}</p>
        </div>
        {post.image && (
          <div className="relative h-60 md:h-96 bg-white">
            <img src={post.image} alt="" className="object-cover w-full h-full" 
            />
          </div>
        )}
        <hr className="my-4 border-t border-gray-300" />
       <div className="flex justify-center items-center space-x-2">
       <button
    onClick={() => handleReactionClick(post.id, 'LIKE')}
    className={`cursor-pointer hover:text-blue-500 flex items-center space-x-2 transition-colors ${reactionType === 'LIKE' ? 'text-blue-500' : 'text-gray-500'}`}

>
    <FontAwesomeIcon icon={faThumbsUp} className="like-icon" />
    {likeCount} Likes
</button>
<button
    onClick={() => handleReactionClick(post.id, 'DISLIKE')}
    className={`text-gray-500 hover:text-red-500 cursor-pointer flex items-center space-x-2 ${reactionType === 'DISLIKE' ? 'text-red-500' : ''}`}
>
    <FontAwesomeIcon icon={faThumbsDown} className="dislike-icon" />
    {dislikeCount} Dislikes
</button>

       
        {/* Bouton de commentaire */}
        <button
  onClick={() => handleCommentButtonClick(post.id)}
  className="text-gray-500 hover:text-blue-500 cursor-pointer flex items-center space-x-2"
>

          <FaComment className="comment-icon" />
          <span>{commentCount} comments</span>
          
        </button></div>

        {/* Composant de commentaire */}


        {showCommentSection && activePostId === post.id && (
          <CommentSection postId={post.id} post={post} />
        )}
      </div>
    </div>
  );
};

export default Post;

