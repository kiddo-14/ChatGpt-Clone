exports.gptResponse=async(req,res)=>{
    try {
        const { message } = req.body;       
        const gptResponse = "This is a GPT response";
    
        return res.status(200).json({
          success: true,
          message: "GPT Response generated successfully",
          data: gptResponse,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "An error occurred while generating GPT response",
          error: error.message,
        });
      }
}