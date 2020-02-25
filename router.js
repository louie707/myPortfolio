const express = require('express')
const router = express.Router();
const emailController = require('./controller/emailController')
const dotenv = require('dotenv')
dotenv.config()




router.get('/', (req, res) => {
    res.render("home")
})

router.post('/sendEmail', emailController.sendEmail)

module.exports = router