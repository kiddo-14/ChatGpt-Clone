  const express = require('express');
  const router = express.Router();
  const {allChats} =require('../controller/Allchats')
  const {deleteChat}=require('../controller/DeleteChats')
  const {addChats}=require('../controller/Addchats')
  const {editChatName}=require("../controller/EditChatname")
  const{displayMessage}=require("../controller/DispalyMessage")
  const {addChatMessage}=require("../controller/AddChatMessage");
  const { gptResponse } = require('../controller/Gptres');
  const { archiveChat } = require('../controller/ArchiveChat');


  router.get("/allchats",allChats);
  router.delete("/deltechats",deleteChat);
  router.post("/addchat",addChats);
  router.put("/editchatname",editChatName);
  router.get("/displaymessage",displayMessage);
  router.post("/addmessage",addChatMessage)
  router.post("/gptresponse",gptResponse)
  router.put("/archive",archiveChat)




  module.exports=router;