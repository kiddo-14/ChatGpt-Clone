const express=require('express');
require("dotenv").config();
const routes =require("./routes/gptRoutes")
const {dbConnect}=require('./config/db')
const app =express();
app.use(express.json());
const cors = require('cors');
const port =4000
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
dbConnect()
console.log("db function call successfully");
app.use("/api",routes);
app.listen(port,()=>{
    console.log(`app is listing at Port: ${port}`);
})

