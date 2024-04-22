const yup = require('yup')
const emailregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const uservalidation = yup.object().shape({
    username:yup.string().min(5, 'username must not be less than 5 characters'),
    email:yup.string().required(true, 'email is required').matches(emailregex, 'email must be valid'),
    password:yup.number().required('password is required')
})

module.exports = {uservalidation}