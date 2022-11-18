const express = require('express')
const Controller = require('../controller/userController')
const router = express.Router()

router.get('/', Controller.renderLoginForm)
router.post('/', Controller.handleLoginForm)

module.exports = router