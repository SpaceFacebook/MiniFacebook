import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Image from 'next/image';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import logochat from '../images/logochatbot1.png'
const Chatbot = () => {

  const API_KEY = "AIzaSyBHFuhyyZ9eIaDl9GGqEn8jCTrXzwU4uec"; // Remplacez par votre clé API Google Cloud
  const systemMessage = {
    "role": "system",
    "content": "Explain things like you're talking to a software professional with 2 years of experience."
  };

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiRequestBody = {
      "prompt": {
        "text": chatMessages[chatMessages.length - 1].message
      }
    };
  
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });
  
    if (response.ok) {
      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].output) {
        setMessages([...chatMessages, {
          message: data.candidates[0].output,
          sender: "ChatGPT"
        }]);
      } else {
        console.error("Réponse API invalide : pas de texte trouvé dans la réponse.");
      }
    } else {
      console.error("Erreur de l'API :", response.status, response.statusText);
    }
  
    setIsTyping(false);
  }
  
  

  return (
    
    <div className=" bottom-10 right-4 sm:right-10 sm:bottom-10 w-72 h-100 sm:w-96 sm:h-96 bg-white rounded-lg border border-gray-300">
      <div className="mb-4 flex items-center ">
        <Image src={logochat} alt="Chatbot" className="w-10 h-10 mr-2 rounded-full" />
        <div>
          <div className="text-xl font-semibold">Chatbot</div>
          <div className="text-gray-500">Your friendly assistant</div>
        </div>
      </div>
        
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chatbot;