import React, {axios,useState, useEffect} from 'react'
import imgProfile from '../images/man.png';
import Image from 'next/image';
import {setShowCommentSection} from "../public/src/features/postSlice"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CommentSection from './CommentSection';
import { FaComment } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
const Post = ({ post }) => {
  const [reactionType, setReactionType] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [activePostId, setActivePostId] = useState(null);
  const showCommentSection = useSelector((state) => state.post.showCommentSection);
  const email=useSelector((state)=>state.auth.email);
  const dispatch = useDispatch();
  const handleCommentButtonClick = (postId) => {
    if (postId === activePostId) {
      setActivePostId(null);
    } else {
      setActivePostId(postId);
    }
    dispatch(setShowCommentSection());
  };
  const handleReactionClick = async (postId, reactionType) => {
    try {
      const reactionData = {
        user: { email: email },
        reactionType: reactionType,
      };

      const response = await fetch(`http://localhost:8080/api/reaction/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reactionData),
      });
        console.log("reaction typpppe: ",reactionType);

        if (response.status === 200) {
          setReactionType(reactionType);
          console.log('Réaction enregistrée avec succès');
          fetchReactionCount();
        } else {
          console.error('Échec de l\'enregistrement de la réaction');
        }
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la réaction : ', error);
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
    // Appeler la fonction pour obtenir le nombre de réactions lorsque le composant se monte
    fetchReactionCount();
  }, []);

  return  (
    <div className='flex flex-col' key={post.id}>
      <div className='bg-white mt-6 rounded-md p-4'>
        <div className="flex items-center space-x-2">
          <Image
            src={imgProfile}
            height={40}
            width={40}
            className="rounded-full cursor-pointer"
            alt=''
          />
          <div>
            <p className='font-medium'>{post.name}</p>
            <p className="text-xs text-gray-500">{post.timeStamp}</p>
          </div>
        </div>
        <div>
          <p className='py-4'>{post.post}</p>
        </div>
        {post.image && (
          <div className="relative h-60 md:h-96 bg-white">
            <img src={post.image} alt="" className="object-cover w-full h-full" />
          </div>
        )}
        <hr className="my-4 border-t border-gray-300" />
       <div className="flex justify-center items-center space-x-2">
       <button
    onClick={() => handleReactionClick(post.id, 'LIKE')}
    className={`text-gray-500 hover:text-blue-500 cursor-pointer flex items-center space-x-2 ${reactionType === 'LIKE' ? 'text-blue-500' : ''}`}
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
          <span>Comment</span>
          
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

