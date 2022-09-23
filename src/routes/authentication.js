const express = require('express')
const routerAuthentication = express.Router()
const {isLoggedIn, isLoggedOut} =require('../lib/is')

const authenticationController = require('../controllers/authenticationController')

routerAuthentication.get('/signup',isLoggedOut,authenticationController.add)
routerAuthentication.post('/signup',isLoggedOut,authenticationController.save)
routerAuthentication.get('/signin',isLoggedOut,authenticationController.login)
routerAuthentication.post('/signin',isLoggedOut,authenticationController.loginverify)
routerAuthentication.get('/profile',isLoggedIn, authenticationController.showprofile)
routerAuthentication.post('/profile/update/:id',isLoggedIn,authenticationController.update)
routerAuthentication.post('/profile/updatepassword/:id',isLoggedIn,authenticationController.updatepassword)
routerAuthentication.post('/profile/addimage/:id',isLoggedIn,authenticationController.addimage)
routerAuthentication.post('/profile/deleteimage/:id',isLoggedIn,authenticationController.deleteimage)
routerAuthentication.get('/logout',isLoggedIn,authenticationController.logout)

module.exports = routerAuthentication