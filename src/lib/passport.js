const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signin', new LocalStrategy({

    usernameField: 'emailUser',
    passwordField: 'passwordUser',
    passReqToCallback: true

}, async (req, emailUser, passwordUser, done) => {


    const rows = await pool.query('select * from user where emailUser = ?', [emailUser])
    if (rows.length > 0) {
        const data = rows[0]
        const validPassword = await helpers.dencryptPassword(passwordUser, data.passwordUser)
        console.log(data);
        if (validPassword) {
            done(null, data)
        } else {
            done(null, false, req.flash('message', 'CREDENCIALES INCORRECTAS'))
        }
    }
    else {
        return done(null, false, req.flash('message', 'EL USUARIO NO EXISTE'))
    }
}))


passport.use('local.signup', new LocalStrategy({
    usernameField: 'emailUser',
    passwordField: 'passwordUser',
    passReqToCallback: true
}, async (req, nameUser, passwordUser, done) => {
    const data = req.body
    data.linksUser=0
    data.defaultUser=true
    data.imgUser="https://res.cloudinary.com/esdruplinks/image/upload/v1663319548/default_kbkb7z.jpg"
    data.public_id="default_kbkb7z"
    
    const emailvalied = await pool.query('select * from user where emailUser = ?', [data.emailUser])
    
    if(emailvalied.length==0){
        data.passwordUser = await helpers.encryptPassword(data.passwordUser)
        const rest = await pool.query('insert into user set ?', [data])
        data.idUser = rest.insertId
        return done(null, data,req.flash('success','Cuenta creada exitosamente!'))
    }
    else{
        if (emailvalied[0].emailUser == data.emailUser) {
            return done(null, false, req.flash('message', 'El correo ya ha sido utilizado'))
        }
    }

}))

passport.serializeUser((user, done) => {
    done(null, user.idUser)
})

passport.deserializeUser(async (idUser, done) => {
    const rows = await pool.query('select *from user where idUser = ?', [idUser])
    done(null, rows[0])
})