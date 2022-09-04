const controllerAuthentication = {}
const pool = require('../database')
const passport = require('passport')
const helpers = require('../lib/helpers')
const { redirect } = require('express/lib/response')

controllerAuthentication.add = (req, res) => {
    res.render('authentication/signup')
}

controllerAuthentication.save = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
})

controllerAuthentication.login = (req, res) => {
    res.render('authentication/signin')
}

controllerAuthentication.loginverify = (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
}

controllerAuthentication.showprofile = (req, res) => {
    res.render('profile')
}

controllerAuthentication.update = async (req, res) => {
    const data = req.body
    const { id } = req.params
    await pool.query('update user set ? where idUser = ?', [data, id])
    res.redirect('/profile')
}

controllerAuthentication.updatepassword = async (req, res) => {
    const data = req.body
    const {id} = req.params
    const rows = await pool.query('select * from user where idUser = ?', [id])

    if (rows.length > 0) {
        const datareal = rows[0]
        const validPassword = await helpers.dencryptPassword(data.passwordUser, datareal.passwordUser)
        
        if (validPassword) {
            data.passwordUser = await helpers.encryptPassword(data.newpasswordUser)
            await pool.query('update user set ? where idUser = ?', [data,id])
            req.flash('success','Contraseña Cambiada Correctamente')
        } else {
            req.flash('message','Contraseña Incorrecta')
        }
    }
    else {
        console.log('err')
    }
    res.redirect('/profile')
}

controllerAuthentication.logout = (req, res) => {
    req.logOut(req.user, err => {
        if (err) return next(err);
        res.redirect("/signin");
    });
}

module.exports = controllerAuthentication