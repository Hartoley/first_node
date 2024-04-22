const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const studentschema =  mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    profile:{type:String}
})
const messageschema = mongoose.Schema({
    contents:{type:String}
    
});

let saltRound = 10

 studentschema.pre("save", function(next) {
    console.log(this.password);
    bcrypt.hash(this.password, saltRound).then((hashpassword)=>{
         this.password = hashpassword
         next()
    }).catch((err)=>{
        console.log(err);
    })
 
 })
const studentmodel = mongoose.model("student_collection", studentschema)
const messagemodel = mongoose.model("message_collection", messageschema)
module.exports = {studentmodel, messagemodel}