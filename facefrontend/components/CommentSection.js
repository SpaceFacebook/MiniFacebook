import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import imgProfile from '../images/man.png';
import Image from 'next/image';

const CommentSection = ({ postId, post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const dateCommentaire = new Date();
 
  const userName = useSelector((state) => state.auth.userName); // Récupérez le nom de l'utilisateur

  const handleProfil = () => {
    router.push('/profil');
  }

  const email = useSelector((state) => state.auth.email);

  // Charger les commentaires existants depuis le backend
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`http://localhost:8080/api/commentaires/post/${postId}`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
      }
    }

    fetchComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      return;
    }

    const dateCommentaire = new Date(); // Définissez la date comme étant la date actuelle

    try {
      const response = await axios.post('http://localhost:8080/api/commentaires/ajouter', {
        post: { id: postId },
        user: { email: email },
        contenu: newComment,
        dateCommentaire
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setComments([...comments, { contenu: newComment, dateCommentaire }]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du commentaire au backend :', error);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2">
        <Image
          src={imgProfile}
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
          onClick={handleProfil}
        />
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          className="rounded-full h-10 flex-1 border border-gray-300 px-4"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full hover-bg-blue-600 cursor-pointer"
        >
          Comment
        </button>
      </div>

      {comments.map((comment, index) => (
        <div key={index} className="bg-gray-100 p-2 rounded-lg my-2">
          <div className="flex items-start space-x-2">
            <Image
              src={imgProfile}
              height={40}
              width={40}
              className="rounded-full cursor-pointer"
              onClick={handleProfil}
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">  {comment.user ? comment.user.firstName : userName || "Unknown"}</span>
                <span className="text-gray-500 text-sm">
                  {comment.dateCommentaire && (
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.dateCommentaire).toLocaleString()}
                    </span>
                  )}
                </span>
              </div>
              <p>{comment.contenu}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
