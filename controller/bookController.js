const { Book, Profile } = require('../models')
const qrcode = require("qrcode")
const { formatFont } = require('../helper/formatFont')
const { Op } = require("sequelize");
// console.log(User);
class Controller{
    static readBook(req, res){
        const filter = req.query.filter
        let {deletes} = req.query
        let option = {
            include: Profile
        }
        let search = req.query.search
        if (search) {
            option = {
                where: {
                    title : {
                        [Op.iLike] : `%${search}%`
                    }
                },
                include: Profile
            }
        }
        if (filter) {
            option.where = {level :Book.getBookbyLevel(filter)}
        }
        // Book.getBookbyLevel(filter)
        Book.findAll(option)
        .then((data) => {
            // res.send(data)
            res.render('book', { data, deletes })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static addBookGet(req, res){
        const errors = req.query.errors
        Profile.findAll()
        .then((data) => {
            res.render('addBook', { data, errors })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static addBookPost(req, res){
        const{ title, level, description, code, publishYear, profileId } = req.body
        Book.create({ title, level, description, code, publishYear, profileId })
        .then((data) => {
            res.redirect('/book')
        })
        .catch((err) => {
            if(err.name == "SequelizeValidationError"){
                err = err.errors.map((el) => el.message)
            }
            res.redirect(`/book/add?errors=${err}`)
            // res.send(err)
            console.log(err);
        })
    }
    static detailBook(req, res){
        const id = req.params.id
        const input_text = `https://perpustakaanmini-fadhlurrahman.up.railway.app//book/${req.params.id}`
        qrcode.toDataURL(input_text, (err, src) => {
            if (err) res.send("Something went wrong!!");
        Book.findByPk(id, {
            attributes: ['title','description']
        })
        .then((data) => {
            res.render('detailBook', { qr_code: src, data , formatFont})
        })
        .catch((err) => {
            res.send(err)
            console.log(err);
        })
    });
    }
    static renderEditBook(req, res){
        let id = +req.params.id
        const errors = req.query.errors
        Book.findOne({where: {id: id}, include: Profile})
        .then((data) => {
            // res.send(data)
            res.render('editBook', {data, errors})
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static handleEditBook(req, res){
        let id = +req.params.id
        // console.log(req.body)
        let {title, level, publishYear, description} = req.body
        Book.update({title, level, publishYear, description}, {where: {id: id}})
        .then((data) => {
            res.redirect('/book')
        })
        .catch((err) => {
            if(err.name === "SequelizeValidationError"){
                err = err.errors.map((el) => el.message)
            }
            res.redirect(`/book/${id}/edit?errors=${err}`)
            // res.send(err)
        })
    }
    static deleteBook(req, res){
        const id = req.params.id
        Book.findOne({
            where: {id: id}
        })
            .then(data => {
                Book.destroy({
                    where: {id: id}
                })
                return data
            })
            .then(data => res.redirect(`/book?deletes=${data.title},${data}`))
            .catch(err => res.send(err))
    }
}

module.exports = Controller