const express = require("express")
const router = express.Router()
const controllerUser = require("../controller/userController")

//findall startup
router.get("/", controllerUser.readBookUser)
module.exports = router