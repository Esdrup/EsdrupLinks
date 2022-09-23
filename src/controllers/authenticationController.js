const controllerAuthentication = {}
const cloudinary = require('../keys_cloudinary')
const fs = require('fs-extra')
const pool = require('../database')
const passport = require('passport')
const helpers = require('../lib/helpers')

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
    const { id } = req.params
    const rows = await pool.query('select * from user where idUser = ?', [id])

    if (rows.length > 0) {
        const datareal = rows[0]
        const validPassword = await helpers.dencryptPassword(data.passwordUser, datareal.passwordUser)

        if (validPassword) {
            data.passwordUser = await helpers.encryptPassword(data.newpasswordUser)
            await pool.query('update user set ? where idUser = ?', [data, id])
            req.flash('success', 'Contraseña Cambiada Correctamente')
        } else {
            req.flash('message', 'Contraseña Incorrecta')
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

controllerAuthentication.addimage = async (req, res) => {
    try {
        const { id } = req.params
        if (req.file == undefined) {
            console.log(req.file);
            req.flash('message', 'Primero seleccionar imagen')
            req.redirect('/profile')
        }
        else {
            if (req.user.defaultUser == true) {
                const result = await cloudinary.v2.uploader.upload(req.file.path)
                await pool.query('update user set imgUser=? , public_id=? , defaultUser=false where idUser=?', [result.secure_url, result.public_id, id])
                await fs.unlink(req.file.path)
                req.flash('success', 'Foto de perfil colocada correctamente')
                res.redirect('/profile')
            }
            else {
                await cloudinary.v2.uploader.destroy(req.user.public_id)

                const result = await cloudinary.v2.uploader.upload(req.file.path)
                await pool.query('update user set imgUser=? , public_id=? where idUser=?', [result.secure_url, result.public_id, id])
                await fs.unlink(req.file.path)
                req.flash('success', 'Foto de perfil colocada correctamente')
                res.redirect('/profile')
            }
        }
    } catch (e) {
        console.log(e);
    }
}

controllerAuthentication.deleteimage = async (req,res)=>{
    if(req.user.defaultUser==false){
        await cloudinary.v2.uploader.destroy(req.user.public_id)
        const linkdefault = "https://res.cloudinary.com/esdruplinks/image/upload/v1663319548/default_kbkb7z.jpg"
        const publicId = "default_kbkb7z"
        pool.query('update user set defaultUser=?, imgUser=? , public_id=?  where idUser= ? ',[true, linkdefault, publicId ,req.user.idUser])
        res.redirect('/profile')
    }
    else{
        req.flash('message','¡No se ha colocado foto!')
        res.redirect('/profile')
    }
}

module.exports = controllerAuthentication