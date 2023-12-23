const express = require('express')
const morgan = require('morgan')
const path = require('path')
const {engine} = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const MYSQLStore = require('express-mysql-session')
const {database} = require('./src/keys')
const passport = require('passport')
const multer = require('multer')
const cloudinary = require('cloudinary')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const handlebars = require('handlebars')


//INITIALS
const app = express()
require('./src/lib/passport')


//SETTIGS
app.set('port',process.env.PORT || 4000)
app.set('views',path.join(__dirname, './src/views'))

//MIDLEWARES
app.use(session({
    secret:process.env.DB_SECRET,
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
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: '.hbs',
    helpers: require('./src/lib/handlebars')
}))
app.set('view engine', '.hbs')                //MOTOR DE VISTAS

app.use(express.urlencoded({extended:false}))   //RECEPCIÓN DE DATOS
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())                     //INICIA PASSPORT

const storage = multer.diskStorage({
    destination: path.join(__dirname,'./src/public/uploads'),
    filename: (req,file,cb) => {
        cb(null,new Date().getTime()+path.extname(file.originalname)) //STORAGE MULTER
    }
})
app.use(multer({storage}).single('imgUser'))      //MULTER


//GLOBAL VARIABLES
app.use((req,res,next) =>{
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user
    next()
})


//ROUTES
const indexRoutes = require('./src/routes')
const authenticationRoutes = require('./src/routes/authentication')
const linksRoutes = require('./src/routes/links')
const friendsRoutes = require('./src/routes/friends')
const uniRoutes = require('./src/routes/uni')

app.use(indexRoutes)
app.use(authenticationRoutes)
app.use(friendsRoutes)
app.use('/links',linksRoutes)
app.use(uniRoutes)


//PUBLIC
app.use(express.static(path.join(__dirname,'./src/public')))

    
//START SERVER
const server = app.listen(app.get('port'), ()=>{
    console.log("SERVER PRENDIDO EN EL PUERTO ",app.get('port'))
})

//SOCKET SETTINGS
const SocketIO = require('socket.io')
const io = SocketIO(server)

io.on('connection',(socket)=>{
    console.log('Nueva Conection',socket.id)
})