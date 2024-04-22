const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
require('dotenv').config()
const ejs = require('ejs')
app.set("view engine", "ejs")
const userrouter = require('./Route/student.route')
const adminrouter = require('./Route/admin.route')
app.use(express.urlencoded({extended:true, limit:"100mb"}))
app.use(express.json({limit:"100mb"}))
app.use(cors({origin:"*"}))
app.use('/student', userrouter)
app.use('/admin', adminrouter)
const socket = require("socket.io")
const messagemodel =require('./model/student.model')
// const messagemodel = require('./model/student.model')





const port = process.env.PORT || 5008
const uri = process.env.MONGODB_URI

const connect = async () =>{
    try {
      const connected = await mongoose.connect(uri) 
     if (connected) {
        console.log("connected to database");
     }
    } catch (error) {
       console.log(error);  
    }
}
connect()

const connection = app.listen(port,()=>{
   console.log("app started at port" + port);
})

let io = socket(connection, {cors:{origin:"*"}})





io.on("connection", (socket)=>{
   console.log("A user connected successfully");
   
   socket.on("newmessage", async (message)=>{
      console.log(message);
    
      try {
        
         const newMessage = new messagemodel({
            contents: message.content,
         });

         await newMessage.save();
         io.emit("receivedmessage", message);
         console.log("message saved", newMessage);
 
      } catch (error) {
         console.log(error);
      }
   })
})
