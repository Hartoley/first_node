const express = require("express")
const router = express.Router()
const {studentsignup, getlandingpage, getstudentsignup, studentlogin, uploadimage} = require("../controller/student.controller")
const {validate} = require("../middleware/validator")
const { uservalidation } = require("../middleware/uservalidation")

router.get('/', getlandingpage)
router.get("/signup", getstudentsignup)
router.post('/register', validate(uservalidation), studentsignup)
router.post('/login', studentlogin)
router.post('/upload', uploadimage)



module.exports = router