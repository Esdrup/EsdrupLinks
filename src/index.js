const express = require('express')
const morgan = require('morgan')
const path = require('path')
const {engine} = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const MYSQLStore = require('express-mysql-session')
const {database} = require('./keys')
const passport = require('passport')


//INITIALS
const app = express()
require('./lib/passport')


//SETTIGS
app.set('port',process.env.PORT || 4000)
app.set('views',path.join(__dirname, 'views'))

//MIDLEWARES
app.use(session({
    secret:'topsecrectesdrup',
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore(database)
}))
app.use(flash())    //FLASH

app.use(morgan('dev'))  //MORGAN

app.engine('.hbs', engine({                                 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')                //MOTOR DE VISTAS

app.use(express.urlencoded({extended:false}))   //RECEPCIÓN DE DATOS
app.use(express.json())


app.use(passport.initialize())
app.use(passport.session())                     //INICIA PASSPORT



//GLOBAL VARIABLES
app.use((req,res,next) =>{
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user
    next()
})



//ROUTES
const indexRoutes = require('./routes')
const authenticationRoutes = require('./routes/authentication')
const linksRoutes = require('./routes/links')


app.use(indexRoutes)
app.use(authenticationRoutes)
app.use('/links',linksRoutes)

//PUBLIC
app.use(express.static(path.join(__dirname,'public')))

//START SERVER
app.listen(app.get('port'), ()=>{
    console.log("SERVER PRENDIDO EN EL PUERTO ",app.get('port'))
})