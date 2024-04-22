const nodemailer = require("nodemailer")


const mail = async (email, username)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:"tolanijimoh1@gmail.com",
            pass:"odqielkpjdwulslm"
        }
    })

    const messagetemplate= `
    <div>
    <h1 style="color:white;" ><strong>Dear ${username} </strong></h1>
    <h1>Welcome to SQI college of ICT <strong>${username} </strong></h1>
    <div/>`

    const mailoptions ={
        from:"tolanijimoh1@gmail.com",
        to:email,
        subject:"Registration mail",
        html: messagetemplate
    }

    try {
        await transporter.sendMail(mailoptions)
        console.log('mail sent successful');
    } catch (error) {
        throw error
    }
}

module.exports = mail