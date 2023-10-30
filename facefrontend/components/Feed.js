import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import Chatbot from "./Chatbot";
import { useSelector } from 'react-redux';

const Feed = () => {
  const showChatBot = useSelector((state) => state.post.showChatBot);
  const noScrollbarStyle = {
    overflow: 'hidden', // Masque la barre de défilement
    position: 'relative', // Ajoute une position relative pour masquer la barre de défilement
  };
  if (!showChatBot) {
    return (
      <div className="flex-grow h-screen pt-6 mr-6 no-scrollbar" style={{ overflowY: 'scroll' }}>
        <div className="mx-auto max-w-md md:max-w-xl lg:max-w-2xl" >
         
           <CreatePost /> 
         
          <Posts />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow h-screen pt-6 mr-6  no-scrollbar" style={{ overflowY: 'scroll' }}>
      <div className="mx-auto max-w-md md:max-w-xl lg:max-w-2xl flex" >
        {/* Colonne de gauche pour le chatbot */}
        <div className="w-3/4">
          <CreatePost /> 
          <Posts />
        </div>

        {/* Colonne de droite pour le chatbot */}
        <div className="w-1/4 pl-10">
        {showChatBot && <Chatbot/>}
        </div>
      </div>
    </div>
  );
};

export default Feed;
