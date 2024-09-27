const chatmsg=require('../models/chatMessage')
exports.displayMessage=async(req,res)=>{
  try{
    const id = req.query.id;
       console.log(id);
       if(!id){
        return res.status(400).json({
          success:false,
          message:"Select the chat first"
        })
       }
       const messageDetails = await chatmsg.find({ chatId: id }).sort({ createdAt: -1 });; 
      console.log(messageDetails);
       if (!messageDetails ) {
         return res.status(201).json({
           success: true,
           message: 'No messages are associated to this chat till now',
         });
       }
        return res.status(200).json({
          success:true,
          message:"Chat Messages associated to chat id",
          data:messageDetails
        })      
  }
  catch(err){
    return res.status(500).json({
        success:false,
        message:"Unable to display the message",
    })
  }
}