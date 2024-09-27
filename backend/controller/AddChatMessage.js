const chatmsg= require('../models/chatMessage');
const chat =require('../models/chat')
exports.addChatMessage=async(req,res)=>{
    try{
        const {id,text,isUser,}=req.body;
        console.log(id,text,isUser);
        if(!id||!text||isUser===undefined){
            return res.status(400).json({
                success:false,
                message:"Required Data is not Found"
            })
        }    
        // new chatmesage is created 
        console.log("jrefsd");
        let resultCame;
        isUser?resultCame='User':resultCame='Gpt'
        const newChatMsg= await chatmsg.create({
        text:text,
        isUser:resultCame,
        chatId: id,  
        createAt:Date.now()
       }) 
       console.log(newChatMsg);   
       if(!newChatMsg){
        return res.status(400).json({
            success:false,
            message:"Unable to store the chat message"
        })
       }
       const updatedChats =await chat.findByIdAndUpdate(
        id,
        { $push: { chatMessage: newChatMsg._id } },
        {new:true}
    );

    console.log(updatedChats)
    if(!updatedChats){
        return res.status(400).json({
            success:false,
            message:"not able to add chatmessage with chat"
        })
       }
       return res.status(200).json({
        success:true,
        message:"successfully able to store chatmessage along with respective chat ids",
        data:newChatMsg,
       })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Not able to add chat message in chatwindow"
        })
    }
}

