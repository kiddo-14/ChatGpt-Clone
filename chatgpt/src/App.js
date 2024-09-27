import React from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/Chatwindow";
import { ChatProvider } from "./context/ChatContext";  
function App() {
  return (
    <ChatProvider>  
      <div className="flex h-screen">
        <Sidebar />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
export default App;
