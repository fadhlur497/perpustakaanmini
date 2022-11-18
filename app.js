// Happy coding guys
const express = require('express')
const routes = require('./routes/index')
const app = express()
const port = 3000
const session = require('express-session')

app.set('view engine','ejs')
app.use(express.urlencoded({ extended:true}))
app.use(session({
  secret: 'keyboard cat', // harus ada
  resave: false,
  saveUninitialized: false,
  cookie: { 
      secure: false,
      sameSite: true // untuk security dari csrf attack
   } // http
}))

app.use('/', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})