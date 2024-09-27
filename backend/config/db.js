const mongoose =require('mongoose');
require('dotenv').config()

exports.dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
.then(console .log("DB Connection Successfull"))
.catch((err)=>{
    console.log("DB Connection failed");
    console.error(err);
    process.exit(1);
});
}