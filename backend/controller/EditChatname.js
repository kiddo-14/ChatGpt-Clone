const chat =require('../models/chat')
exports.editChatName=async(req,res)=>{
 try{
    const{id,newName}=req.body;
    
    if(!id|| newName.trim()===""){
        return res.status(400).json({
            success:false,
            message:"id/name is not appropriate"
        })
    }
 
    const newdetails = await chat.findByIdAndUpdate(id,{chatName:newName},{new:true});
    if(!newdetails){
        return res.status(404).json({
            success:false,
            message:"updated chat is not found"
        })
    }
     return res.status(200).json({
        success:true,
        message:"Successfully able to change the name",
        data:newdetails
     })

 }
 catch(err){
    return res.status(500).json({
        success:false,
        message:"not able to Edit the chat name"
    })
 }
}