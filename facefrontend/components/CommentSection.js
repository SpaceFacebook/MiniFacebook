import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import imgProfile from '../images/man.png';
import Image from 'next/image';

const CommentSection = ({ postId, post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const dateCommentaire = new Date();
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileImages, setUserProfileImages] = useState({});
  const [newCommentError, setNewCommentError] = useState('');
  const userName = useSelector((state) => state.auth.userName); // Récupérez le nom de l'utilisateur
  const [commentAdded, setCommentAdded] = useState(false);
  const timeAgo = (date) => {
    const now = new Date();
    const timeDiff = now - date;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  };
  const handleProfil = () => {
    router.push('/profil');
  }

  // const email = useSelector((state) => state.auth.email);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userEmail = localStorage.getItem('userEmail');
      setCurrentUserEmail(userEmail);
      if(currentUserEmail){
        console.log("L_email est : ",currentUserEmail)
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
    }
  }
  }, [currentUserEmail]);
  
  // Fonction pour récupérer l'image de profil d'un utilisateur par e-mail
async function fetchUserProfileImage(email) {
  try {
    const response = await axios.get(`http://localhost:8080/api/userInfo?userEmail=${email}`);
    return response.data.profileImage;
  } catch (error) {
    console.error(`Error fetching user information for email ${email}:`, error);
    return null;
  }
}
useEffect(() => {
  // Récupération des images de profil des utilisateurs associés aux commentaires
  const fetchUserImagesForComments = async () => {
    const userImages = {};
    for (const comment of comments) {
      if (comment.user && comment.user.email) {
        const email = comment.user.email;
        const profileImage = await fetchUserProfileImage(email);
        userImages[email] = profileImage;
      }
    }
    setUserProfileImages(userImages);
  };

  fetchUserImagesForComments();
}, [comments]);

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
  }, [postId, commentAdded]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
    setNewCommentError('');
  };

  const handleAddComment = async () => {
    setNewCommentError('');
    if (newComment.trim() === '') {
      setNewCommentError('Le commentaire ne peut pas être vide. Veuillez entrer un commentaire valide.');
      return;
    }
    const dateCommentaire = new Date(); // Définissez la date comme étant la date actuelle
    const commentaireData = {
      contenu: newComment,
      userEmail: currentUserEmail,
      postId: postId,
      dateCommentaire:dateCommentaire.toISOString(),
    };
    try {
      console.log("post id est: ",postId)
      const response = await axios.post('http://localhost:8080/api/commentaires/ajouter',commentaireData, {
        
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // if (response.status === 200) {
      //   // Mettre à jour l'image du profil dans userProfileImages
      //   const userProfileImage = await fetchUserProfileImage(currentUserEmail);
      //   // Update userProfileImages state first
      // setUserProfileImages({
      //   ...userProfileImages,
      //   [currentUserEmail]: userProfileImage,
      // });
      //   // Ajouter le nouveau commentaire à la liste des commentaires
      //   const newCommentItem = {
      //     contenu: newComment,
      //     dateCommentaire,
      //     user: {
      //       currentUserEmail,
      //     },
      //   };
      //   setComments([...comments, newCommentItem]);
      //   setNewComment('');
      // }
      if (response.status === 200) {
        const userProfileImage = await fetchUserProfileImage(currentUserEmail);
        setUserProfileImages({
          ...userProfileImages,
          [currentUserEmail]: userProfileImage,
        });
        setCommentAdded((prev) => !prev); // Force a rerender
        const newCommentItem = {
          contenu: newComment,
          dateCommentaire,
          user: {
            currentUserEmail,
          },
        };
        setComments([...comments, newCommentItem]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du commentaire au backend :', error);
    }
  };

  return (
    <div className="mt-4 max-h-300 overflow-y-scroll" >
    <div className="flex items-center space-x-2">
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
      {newCommentError && (
        <p className="text-red-500 mt-2">{newCommentError}</p>
      )}
      <div className=' bg-gray-100 max-h-40 overflow-y-auto'>
      {comments.map((comment, index) => (
        <div key={index} className=" p-2 rounded-lg my-2">
          <div className="flex items-start space-x-2">
            <Image
              src={comment.user && comment.user.email ? userProfileImages[comment.user.email] || imgProfile : imgProfile}

              height={40}
              width={40}
              className="rounded-full cursor-pointer"
              onClick={handleProfil}
              alt="image profile"
            />
            <div>
              <div className="flex items-center space-x-2">
              <span className="font-bold text-sm">{comment.user && comment.user.email === currentUserEmail ? "You" : comment.user ? comment.user.firstName : userName || "Unknown"}</span>

                <span className="text-gray-500 text-xs">
                  {comment.dateCommentaire && (
                    <span className="text-gray-500 text-xs">
                      {timeAgo(new Date(comment.dateCommentaire))}
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
    </div>
  );
};

export default CommentSection;
