import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const ChatMessage = ({ message, loading }) => {
  return (
    <div className={`mb-4 flex ${message.isUser==='User'? "justify-end" : "justify-start"}`}>
      {message.isUser!=='User' && (
        <div className=" w-6 h-8  flex mr-2">
          <FontAwesomeIcon icon={faGlobe} className="m-auto" />
        </div>
      )}
      <div
        className={`inline-block p-3 rounded-3xl bg-gray-100 text-black" `}
        style={{
          maxWidth: message.isUser==='User' ? "60%" : "80%",
        }}
      >
        {loading && message.isUser!=='User' ? (  
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-blue-600 rounded-full" role="status">
            </div>
          </div>
        ) : (
          <p>{message.text}</p>  
        )}
      </div>

      {message.isUser==='User' && ( 
        <div className=" w-6 h-8  flex ml-2">
          <FontAwesomeIcon icon={faUser} className="m-auto" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
