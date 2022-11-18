const express = require('express')
const Controller = require('../controller/userController')
const router = express.Router()

router.get('/', Controller.renderRegisterForm)
router.post('/', Controller.handleRegisterForm)

module.exports = router