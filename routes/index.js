const express = require("express")
const router = express.Router()
const userRouter = require("./userRouter")
const Controller = require('../controller/userController')
const bookRouter = require("./bookRouter")
const profileRouter = require("./profileRouter")
const register = require('./register')
const login = require('./login')
// router.get("/", (req, res) => {
//     res.redirect("/incubators")
// })

router.use('/register', register)
router.use('/login', login)
router.use(function(request, response, next){
    if (!request.session.userId){
        const error = 'Please Login First'
        response.redirect(`/login?error=${error}`)
    } else {
        next()

    }
})

router.use("/user", userRouter)
router.use("/book", bookRouter)
router.get('/logout', Controller.logOut)
router.use("/profile", profileRouter)

module.exports = router