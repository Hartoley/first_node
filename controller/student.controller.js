const studentmodel = require('../model/student.model')
const bcrypt = require('bcryptjs')
const {cloudinary} = require('../utils/cloudinary')
const {uservalidation} = require('../middleware/uservalidation')
const mail = require("../middleware/mailer")

const studentsignup = async(req, res) =>{
try {
    console.log( req.body, "body");
    const {username, email, password} = req.body
    if (username == "" || password == "" || email == "") {
       res.status(402).send({message:"input fiels cannot be empty", status: false}) 
    }

    const validate = await uservalidation.validate(req.body)
    if (!validate) {
      res.status(400).send({message:"unable to validate user", status: false}) 
    }
    const existinguser = await studentmodel.findOne({email:email})
     console.log(existinguser);
     if (existinguser) {
        res.status(405).send({message:"user already exist", status:false})
     }
     const student = await studentmodel.create({username, email, password})
     if (!student) {
        res.status(409).send({message:"unable to save user", status:false})
     }
     await mail(email, username)
     return res.status(200).send({message:"user signed up successfully", status:true})

}catch(error){
  console.log(error);
  if (error) {
    res.status(407).send({message:error.message})
  }
  return res.status(500).send({message:'internal server error'})

}
}
const studentlogin = async(req, res)=>{
   try {
       const {email , password } = req.body
       if (email == "" || password == "") {
        res.status(402).send({message:"input field cannot be empty", status: false})
       }
      const user = await studentmodel.findOne({email:email})
      if (!user) {
        res.status(407).send({message:"user does not exist , plsease sign up", status: false})
      }
      
      console.log(user);
      const hashpassword = await bcrypt.compare(password , user.password)
        if (!hashpassword) {
            res.status(409).send({message:"invalid password", status: false}) 
        }
        const useremail = user.email

        return res.status(200).send({message:"user login successful", status:true,useremail })

   } catch (error) {
    console.log(error);
    res.status(500).send({message:"interal server error", status:false})
   }
}

const uploadimage = async (req, res) =>{
   const {image , email} = req.body
   console.log(image);
  const uploder = await cloudinary.uploader.upload(image);
  console.log(uploder.secure_url);
  let myimage = uploder.secure_url
  if (!uploder) {
    console.log(error);
    if (error) {
      res.status(400).send({message:error.message})
    }
  }
 const profileimage = await studentmodel.findOneAndUpdate(
    {email: email},
    {$set:{profile: myimage}},
    {new: true}
  )
  if (!profileimage) {
    res.status(405).send({message:"unable to update profile", status: false})
  }

  return res.status(200).send({message:"upload successful", status:true,myimage})

}


const getstudentsignup = (req, res) =>{
    res.render("signup")
}
const getlandingpage = (req, res)=>{
    res.render("index")
}


module.exports = {studentsignup, getlandingpage, getstudentsignup, studentlogin, uploadimage}