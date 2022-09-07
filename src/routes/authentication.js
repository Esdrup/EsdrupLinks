const express = require('express')
const routerAuthentication = express.Router()
const {isLoggedIn, isLoggedOut} =require('../lib/is')

const authenticationController = require('../controllers/authenticationController')

routerAuthentication.get('/signup',isLoggedOut,authenticationController.add)
routerAuthentication.post('/signup',isLoggedOut,authenticationController.save)
routerAuthentication.get('/signin',isLoggedOut,authenticationController.login)
routerAuthentication.post('/signin',isLoggedOut,authenticationController.loginverify)
routerAuthentication.get('/profile',isLoggedIn, authenticationController.showprofile)
routerAuthentication.post('/profile/update/:id',authenticationController.update)
routerAuthentication.post('/profile/updatepassword/:id',authenticationController.updatepassword)
routerAuthentication.get('/logout',isLoggedIn,authenticationController.logout)

module.exports = routerAuthentication