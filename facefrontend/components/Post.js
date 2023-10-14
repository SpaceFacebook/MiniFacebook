import React from 'react'
import imgProfile from '../images/man.png';
import Image from 'next/image';
import {setShowCommentSection} from "../public/src/features/postSlice"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CommentSection from './CommentSection';
import { FaComment } from 'react-icons/fa';

const Post = ({ post }) => {
  const showCommentSection = useSelector((state) => state.post.showCommentSection);
  const dispatch = useDispatch();
  const handleCommentButtonClick = () => {
    dispatch(setShowCommentSection())
  };
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
       
        {/* Bouton de commentaire */}
        <button
          onClick={handleCommentButtonClick}
          className="text-gray-500 hover:text-blue-500 cursor-pointer flex items-center space-x-2"
        >
          <FaComment className="comment-icon" />
          <span>Comment</span>
          
        </button></div>

        {/* Composant de commentaire */}
        {showCommentSection && <CommentSection postId={post.id} post={post} />}
      </div>
    </div>
  );
};

export default Post;

