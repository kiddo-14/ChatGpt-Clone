const mongoose =require('mongoose');

const Chat = new mongoose.Schema({
 chatName:{
   type:String,
   required:true
 }, 
 createAt:{
  type:Date,
  default:Date.now()
 }
});

module.exports=mongoose.model("chat",Chat);