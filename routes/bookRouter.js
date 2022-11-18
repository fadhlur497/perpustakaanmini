const express = require("express")
const router = express.Router()
const Controller = require("../controller/bookController")

//findall startup
router.get("/", Controller.readBook)
router.get('/add', Controller.addBookGet)
router.post('/add', Controller.addBookPost)
router.get('/:id', Controller.detailBook)
router.get('/:id/edit', Controller.renderEditBook)
router.post('/:id/edit', Controller.handleEditBook)
router.get('/:id/delete', Controller.deleteBook)
module.exports = router