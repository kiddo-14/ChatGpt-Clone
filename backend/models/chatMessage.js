const { response } = require('express');
const mongoose =require('mongoose');

const ChatMessage = new mongoose.Schema({
   isUser: {
      type: String,
      required: true
   },
   text: {
      type: String,
      required: true
   },
 createAt:{
    type:Date,
    default:Date.now()
 },
 chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true }
});

module.exports=mongoose.model("chatmsg",ChatMessage);