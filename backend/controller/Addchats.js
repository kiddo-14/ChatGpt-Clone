const chat =require('../models/chat');

exports.addChats=async(req,res)=>{
  try{
     const {name} =req.body;
     if(!name||name.trim()===""){
        return res.status(400).json({
            success:false,
             message:" name is not present"
        })
     }
     const newChat =await chat.create({
        chatName:name,
        createAt:Date.now()
     });
      return res.status(200).json({
        success:true,
        message:"Add a new chat",
        data : newChat
      })
  }
  catch(err){
    return res.status(200).json({
        success:true,
        message:"Add a new chat",
        data : newChat
      })
  }
}