const chat =require('../models/chat')

exports.allChats=async(req,res)=>{
  try{
    const chatDetails =await chat.find().sort({createAt:-1});
    if(!chatDetails){
        return res.status(400).json({
            success:false,
            message:"No Chats are available"
        })
    }
    return res.status(200).json({
        success:true,
        message:"All chats Details",
        data:chatDetails
    })
  }
  catch(err){
    return res.status(500).json({
       success:false,
       message: "Not able to fetched the Chats" 
    })
  }
}