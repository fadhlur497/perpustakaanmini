const express = require("express")
const router = express.Router()
const Controller = require("../controller/profileController")

//findall startup
router.get("/", Controller)
module.exports = router