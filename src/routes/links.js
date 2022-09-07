const express = require('express')
const routerLinks = express.Router()
const controllerLink = require('../controllers/linkController')
const {isLoggedIn} = require('../lib/is') 

routerLinks.get('/add',isLoggedIn,controllerLink.add)
routerLinks.post('/add',isLoggedIn,controllerLink.save)
routerLinks.get('/', isLoggedIn,controllerLink.list)
routerLinks.get('/delete/:idLink',isLoggedIn,controllerLink.delete)
routerLinks.get('/update/:idLink',isLoggedIn,controllerLink.edit)
routerLinks.post('/update/:idLink',isLoggedIn,controllerLink.update)


module.exports = routerLinks 