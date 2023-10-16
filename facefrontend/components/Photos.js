import React from 'react'
import { useSelector } from 'react-redux';
import Chatbot from './Chatbot';
function Photos() {
  const showChatBot = useSelector((state) => state.post.showChatBot);
  return (
    <div className='   absolute top-[1090px] left-[58px]  p-4 w-[400px] h-[400px]'>
      {showChatBot && <Chatbot/>}
    </div>
  )
}

export default Photos
