import React, { createContext, useState, useEffect } from "react";


export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]); 
  const [activeChatId, setActiveChatId] = useState(null); 


  // const startNewChat = () => {
  //   const newChatId = new Date().getTime().toString(); 
  //   const newChat = { id: newChatId, name: `Chat ${chats.length + 1}`, messages: [] };
  //   setChats((prevChats) => [ newChat,...prevChats]);
  //   setActiveChatId(newChatId); 
  // };


  // const editChatName = (chatId, newName) => {
  //   setChats((prevChats) =>
  //     prevChats.map((chat) =>
  //       chat.id === chatId ? { ...chat, name: newName } : chat
  //     )
  //   );
  // };

  // const addMessageToChat = (message) => {
  //   const newMessage = {
  //     id: new Date().getTime(),
  //     text: message,
  //     isUser: true,
  //   };
  //   const responseMessage = {
  //     id: new Date().getTime() + 1,
  //     text: "This is the answer from ChatGPT",
  //     isUser: false,
  //   };

  //   setChats((prevChats) =>
  //     prevChats.map((chat) =>
  //       chat.id === activeChatId
  //         ? { ...chat, messages: [...chat.messages, newMessage, responseMessage] }
  //         : chat
  //     )
  //   );
  // };
  // useEffect(() => {
  //   if (chats.length === 0) {
  //     const defaultChatId = new Date().getTime().toString();
  //     const defaultChat = { id: defaultChatId, name: "Default Chat", messages: [] };
  //     setChats([defaultChat]);
  //     setActiveChatId(defaultChatId); 
  //   }
  // }, []); 
  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        setChats,
        setActiveChatId
        // startNewChat,
        // addMessageToChat,
        // deleteChat,
        // editChatName,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
