import React, { useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ChatContext } from "../context/ChatContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import logo from '../assests/logo.png';

const Sidebar = () => {
  const { activeChatId, setActiveChatId } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newChatName, setNewChatName] = useState("");
  const [dropdownOpenChatId, setDropdownOpenChatId] = useState(null);
  const [tooltipChatId, setTooltipChatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNewChatInput, setShowNewChatInput] = useState(false);
  const inputRef = useRef(null); 

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/allchats");
        const data = await response.json();
        if (response.ok && data.success) {
          setChats(data.data);
          setActiveChatId(data.data[0]._id);
        } else {
          console.error("Error fetching chats:", data.message);
          setActiveChatId(null);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  const startNewChat = async () => {
    if (newChatName.trim()) {
      try {
        const response = await fetch("http://localhost:4000/api/addchat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newChatName }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setChats([{ _id: data.data._id, name: newChatName }, ...chats]);
          setNewChatName("");
          setActiveChatId(data.data._id);
          setShowNewChatInput(false); 
        } else {
          console.error("Error creating new chat:", data.message);
          alert("Error creating new chat:", data.message);
        }
      } catch (error) {
        console.error("Error creating new chat:", error);
      }
    } else {
      setShowNewChatInput(false); 
    }
  };

  const handleInputChange = (e) => {
    setNewChatName(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      startNewChat();
    }
  };

  const handleEdit = (chatId, chatName) => {
    setEditingChatId(chatId);
    setNewChatName(chatName);
    setDropdownOpenChatId(null);
  };

  const handleEditSubmit = async (chatId) => {
    if (newChatName.trim()) {
      try {
        const response = await fetch("http://localhost:4000/api/editchatname", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: chatId, newName: newChatName }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          const updatedChats = chats.map((chat) =>
            chat._id === chatId ? { ...chat, name: newChatName } : chat
          );
          setChats(updatedChats);
          setEditingChatId(null);
          setNewChatName("");
        } else {
          console.error("Error editing chat name:", data.message);
          alert("Error editing chat name:", data.message);
        }
      } catch (error) {
        console.error("Error editing chat name:", error);
      }
    }
  };

  const deleteChat = async (chatId) => {
    try {
      const response = await fetch("http://localhost:4000/api/deltechats", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: chatId }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        const remainingChats = chats.filter((chat) => chat._id !== result.data._id);
        setChats(remainingChats);
        setDropdownOpenChatId(null);
        if (remainingChats.length > 0) {
          setActiveChatId(remainingChats[0]._id);
        } else {
      
          setActiveChatId(null);
        }
      } else {
        console.error("Error deleting chat:", result.message);
        alert("Error deleting chat:", result.message);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      alert("Error deleting chat:", error);
    }
  };

  const handleEditKeydown = (e, chatId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSubmit(chatId);
    }
    if (e.key === "Escape") {
      setEditingChatId(null);
      setNewChatName("");
    }
  };

  const handleChatClick = (chatId) => {
    if (!editingChatId) {
      setActiveChatId(chatId);
    }
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowNewChatInput(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-1/5 my-2 mx-4 mb-2 bg-gray-100 rounded-2xl p-4 flex flex-col h-19/20">
      <div className="flex justify-between items-center mb-2">
        <img src={logo} className="h-8 basis-12" alt="logo"/>
        <div className="flex border ">
          <button
            onClick={() => setShowNewChatInput((prev) => !prev)} 
            className=" w-fit relative text-black outline-none"
          >
            <PlusIcon className="h-8" />
          </button>
        </div>
      </div>
      <hr className="mt-2 border-[1.25px] border-slate-400 mb-2"/>
      {showNewChatInput && (
        <div className="mb-2" ref={inputRef}>
          <input
            type="text"
            value={newChatName}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="p-1 border rounded w-full"
            placeholder="Enter chat name..."
          />
        </div>
      )}

      <ul className="space-y-2 overflow-y-auto flex-grow sidebar">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <li
              key={chat._id}
              className={`p-2 rounded text-slate-800 text-md cursor-pointer ${
                activeChatId === chat._id ? "bg-gray-300" : "hover:bg-slate-200"
              } ${editingChatId === chat._id ? "bg-slate-300" : ""}`}
              onClick={() => { handleChatClick(chat._id); }}
            >
              {editingChatId === chat._id ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                    onKeyDown={(e) => handleEditKeydown(e, chat._id)}
                    className=" border rounded"
                  />
                  <button
                    onClick={() => {
                      setEditingChatId(null);
                      setNewChatName("");
                    }}
                    className="border-red-100 rounded-full text-xl"
                  >
                    <FontAwesomeIcon icon={faCircleXmark} className="text-slate-600" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="cursor-pointer font-normal">{chat.name || chat.chatName}</span>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpenChatId(dropdownOpenChatId === chat._id ? null : chat._id);
                      }}
                      className="px-2 relative text-gray-100 hover:text-slate-600"
                      onMouseEnter={() => setTooltipChatId(chat._id)}
                      onMouseLeave={() => setTooltipChatId(null)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                      {tooltipChatId === chat._id && (
                        <div className="absolute right-4 bottom-0 w-fit bg-gray-700 text-white text-xs rounded py-1 px-2 shadow-lg">
                          <p className="whitespace-nowrap">Options</p>
                        </div>
                      )}
                    </button>

                    {dropdownOpenChatId === chat._id && (
                      <div
                        className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10"
                        onMouseEnter={() => setDropdownOpenChatId(chat._id)} // Keep the dropdown open on hover
                        onMouseLeave={() => setDropdownOpenChatId(null)} // Close the dropdown on mouse leave
                      >
                        <ul className="py-1">
                          <li
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
                            onClick={() => handleEdit(chat._id, chat.chatName || `Chat ${chat._id}`)}
                          >
                            Rename
                          </li>
                          <li
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
                            onClick={() => { deleteChat(chat._id); }}
                          >
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="font-medium relative mr-2 mt-5 text-center">No chats yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
