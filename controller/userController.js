const { User, Book, Profile} = require("../models")
const bcryptjs = require('bcryptjs')
const session = require('express-session')
const { Op } = require("sequelize");

class Controller{
    static renderRegisterForm(request, response){
        let {errors} = request.query
        response.render('registerForm', {errors})
    }

    static handleRegisterForm(request, response){
        // console.log(request.body)
        let { userName, email, password, role } = request.body
        User.create({userName, email, password, role})
            .then((data) => {
                response.redirect('/login')
            })
            .catch((err) => {
                if (err.name == 'SequelizeUniqueConstraintError' || 'SequelizeValidationError'){
                    let errors = err.errors.map(x => {
                        return x.message
                    })
                    response.redirect(`/register?errors=${errors}`)
                } else {
                    response.send(err)
                }
            })
    }

    static renderLoginForm(request, response){
        const {error} = request.query
        response.render('loginForm', {error})
    }

    static handleLoginForm(request, response){
        // 1. findOne User dari userName
        // 2. kalo User ada, compare plain password apakah sama dengan hash password (di DB)
        // 3. kalo ga sama passwordnya, ga boleh masuk ke home, keluar error
        // 4. kalo password sesuai, maka redirect ke home
        let { userName, password } = request.body
        User.findOne({where : {userName}})
            .then((data) => {
                if (data) {
                    const isValidPassword = bcryptjs.compareSync(password, data.password) // true atau false

                    if (isValidPassword) {
                        // case berhasil login

                        request.session.userId = data.id // set session di controller login
                        request.session.role = data.role
                        if(request.session.role === 'User') {
                            return response.redirect('/user')
                        } else {
                            return response.redirect('/book')
                        }
                    } else {
                        const error = "Invalid Username and Password"
                        return response.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "Invalid Username and Password"
                    return response.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                response.send(err)
            })
    }

    static logOut(request, response){
        request.session.destroy((err) => {
            if (err) {
                console.log(err)
            } else {
                response.redirect('/login')
            }
        })
    }

    static readBookUser(req, res){
        const filter = req.query.filter
        let option = {
            include: Profile
        }
        // console.log(req.query);
        let search = req.query.search
        // console.log(search);
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
        Book.findAll(option)
        .then((data) => {
            res.render('bookUser', { data })
        })
        .catch((err) => {
            res.send(err)
            console.log(err);
        })
    }
}

module.exports = Controller