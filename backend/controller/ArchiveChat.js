const chat =require('../models/chat');
exports.archiveChat=async(req,res)=>{
  try{
    const{id,isarchive}=req.body;
    console.log(isarchive);
    if(!id||isarchive===undefined){
        return res.status(404).json({
            success:false,
            message:"Id id not found for this chat"
        })
    }
    const chatdetails =await chat.findById(id);
    if(!chatdetails){
        return res.status(400).json({
            success:false,
            message:"Not chat details is found for particular chat id"
        })
    }
    console.log(chatdetails);
    chatdetails.isArchive=isarchive;
    await chatdetails.save();
    console.log(chatdetails);
    return res.status(200).json({
        success:true,
        message:"Succesfully abble to archive/unarchive the chat",
        data:chatdetails
    })
  }
  catch(err){
    return res.status(500).json({
        success:false,
        message:"there is an error while archive"
    })
  }
}
