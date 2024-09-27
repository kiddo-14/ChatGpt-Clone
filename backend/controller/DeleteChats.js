const Chat =require("../models/chat") 
const chatmsg =require("../models/chatMessage")
exports.deleteChat=async(req,res)=>{
 try{
     const {id} =req.body;
 
     if(!id){
        return res.status(400).json({
            success:false,
            message:"Chat id is NULL"
        })
     }
     const chatDetails =await Chat.findByIdAndDelete(id);
     if(!chatDetails){
        return res.status(400).json({
            success:false,
            message:"No chat is exist for this particular chatid"
        })
     }
     await chatmsg.deleteMany({ chatId: id });

     return res.status(200).json({
        success:true,
        message:"Successfully able to delete the chat"
        ,data:chatDetails
     })
 }
 catch(err){
    return res.status(500).json({
        success:false,
        message:"Not able to delete the chat"
    })
 }
}