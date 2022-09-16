const express = require('express')
const routerFriends = express.Router()
const {isLoggedIn} = require('../lib/is')
const friendsController = require('../controllers/friendsController')

routerFriends.get('/friends',isLoggedIn,friendsController.friends)
routerFriends.get('/solicitudes',isLoggedIn,friendsController.solicitudes)



module.exports = routerFriends