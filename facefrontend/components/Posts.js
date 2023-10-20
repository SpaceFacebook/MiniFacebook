import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { addAllPost, selectPost } from '../public/src/features/postSlice';
import axios from 'axios';
import Image from 'next/image';
import { setshowChatBotSection } from '../public/src/features/postSlice';
import Chatbot from './Chatbot';

const Posts = ({ userPerformed}) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  const [userPosts, setUserPosts] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userEmail = localStorage.getItem('userEmail');
      setCurrentUserEmail(userEmail);
    }

    const fetchData = () => {
      const FACEBOOK_CLONE_ENDPOINT = 'http://localhost:8080/api/v1/post';

      const response = axios
        .get(FACEBOOK_CLONE_ENDPOINT)
        .then((response) => {
          dispatch(addAllPost(response.data));
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    };

    if (userPerformed) {
      const USER_SPECIFIC_URL = `http://localhost:8080/api/v1/post/api/postUser?userEmail=${currentUserEmail}`;

      axios
        .get(USER_SPECIFIC_URL)
        .then((response) => {
          setUserPosts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user-specific posts:', error);
        });
    } else {
      fetchData();
    }
  }, [dispatch, userPerformed, currentUserEmail]);

  return (
    <div>
      {userPerformed ? (
        userPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}

      {/* {showChatBot && <Chatbot />} */}
    </div>
  );
};

export default Posts;
