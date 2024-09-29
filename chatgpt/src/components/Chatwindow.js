import React, { useState, useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import gptLogo from "../assests/gpt-logo.jpg";
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import logo from '../assests/logo.png'
import logowithoutName from '../assests/Kanerika.webp'
const ChatWindow = () => {
  const { activeChatId, chats, setChats } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [messages, setMessages] = useState([]);
  const [placeholderMessage, setPlaceholderMessage] = useState(null); 
  const messageEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeChatId) {
        try {
          const response = await fetch(`http://localhost:4000/api/displaymessage?id=${activeChatId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          if (result.success) {
            setMessages(result.data);
          } else {
            console.error(result.message);
            setMessages([]);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [activeChatId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
 

  const sendMessageToBackend = async (messageText) => {
    try {
      const response = await fetch("http://localhost:4000/api/addmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: activeChatId,
          text: messageText,
          isUser: true,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessages((prevMessages) => [...prevMessages, result.data]);

        setIsLoading(true);
        const placeholder = {
          _id: "loading-placeholder", 
          text: "Loading...",
          isUser: false,
        };

        setMessages((prevMessages) => [...prevMessages, placeholder]);
        setPlaceholderMessage(placeholder);

        setTimeout(async () => {
          await getGptResponse(messageText);
        }, 2000);
      } else {
        console.error(result.message || "Failed to send the message");
      }
    } catch (error) {
      console.error("Error sending message to backend:", error);
    }
  };

  const getGptResponse = async (userMessage) => {
    try {
      const gptResponse = await fetch("http://localhost:4000/api/gptresponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: activeChatId,
          prompt: userMessage,
        }),
      });

      const result = await gptResponse.json();

      if (gptResponse.ok && result.success) {
        const gptMessage = {
          _id: result._id, 
          text: result.data,
          isUser: false,
        };
        await storeGptResponseInDb(gptMessage);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === "loading-placeholder" ? gptMessage : msg
          )
        );
      } else {
        console.error(result.message || "Failed to get GPT response");
      }
    } catch (error) {
      console.error("Error fetching GPT response:", error);
    } finally {
      setIsLoading(false); 
      setPlaceholderMessage(null);
    }
  };

  const storeGptResponseInDb = async (gptMessage) => {
        try {
          const response = await fetch("http://localhost:4000/api/addmessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: activeChatId,
              text:gptMessage.text,
              isUser: false, 
            }),
          });
          const result = await response.json();  
          if (!response.ok || !result.success) {
            console.error(result.message || "Failed to store GPT response in database");
          } 
        } catch (error) {
          console.error("Error storing GPT response in database:", error);
        }
      }
  const handleSend = () => {
    if (inputValue.trim() !== "") {
      sendMessageToBackend(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-11/12 flex flex-col">
      <div className="flex-grow mt-3 mr-3 bg-white p-2 overflow-y-auto">
        {activeChatId ? (
          messages.length > 0 ? (
            messages
              .filter((message) => message !== null && message !== undefined) 
              .map((message, index) => (
                <ChatMessage
                  key={message._id || index} 
                  message={message}
                  loading={isLoading && message._id === "loading-placeholder"} 
                />
              ))
          ) : (
            <div className="flex flex-col justify-center">
            <img src={logo} className="h-8  mx-auto mt-3 center relative text-3xl top-56 " alt="logo"/>
            <div className="text-center relative text-3xl top-56 text-gray-500">Start your conversation with us...
              
            </div>
            
            </div>
          )
        ) : (
          <>
            <div className="text-center text-3xl font-bold mt-28 text-slate-600">
              Create a chat to start a conversation.
            </div>
            <img className="mx-auto w-48 h-48" src={logowithoutName} alt="logo" />
          </>
        )}
        <div ref={messageEndRef} />
      </div>
      <div className="m-auto w-4/5 p-1 mb-4 rounded-3xl border border-gray-300 bg-white flex">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border-gray-300 rounded-2xl outline-none resize-none overflow-auto"
          rows="1"
          onKeyDown={handleKeyDown}
          disabled={isLoading||!activeChatId}
        />
        <button
          onClick={handleSend}
          className={`ml-1 rounded ${isLoading ? "text-slate-300" : "text-slate-600"}`}
          disabled={isLoading||!activeChatId}
        >
          <FontAwesomeIcon icon={faCircleArrowUp} className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;



