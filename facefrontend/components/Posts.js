import React ,{  useEffect } from 'react'
import Post from './Post'
import { useDispatch ,useSelector} from 'react-redux';
import { addAllPost, selectPost } from "../public/src/features/postSlice";
import axios from 'axios';


const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  
  useEffect(() => {
    const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post";
    const fetchData = () => {
      const response = axios
        .get(FACEBOOK_CLONE_ENDPOINT)
        .then((response) => {
          console.log(response.data);
          dispatch(addAllPost(response.data));
        });
    };
    fetchData();
    console.log(posts);
  }, []);

  return (
    <div>
      {posts.map((post) => (
            
        <Post post={post} key={post.id} />
      ))}
      
    </div>
  );
};

export default Posts