const express = require('express')
const routerUni = express.Router()
const controllerUni = require('../controllers/uniController')
const {isLoggedIn} = require('../lib/is')

routerUni.get('/uni',isLoggedIn,controllerUni.listUni)
routerUni.get('/course',isLoggedIn,controllerUni.course)
routerUni.post('/course/add',isLoggedIn,controllerUni.addcourse)
routerUni.get('/course/deleteconfirm/:id',isLoggedIn,controllerUni.deleteConfirm)
routerUni.get('/course/delete/:id',isLoggedIn,controllerUni.delete)
routerUni.get('/course/update/:id',isLoggedIn,controllerUni.edit)
routerUni.post('/course/update/:id',isLoggedIn,controllerUni.update)
routerUni.post('/course/update/title/:id',isLoggedIn,controllerUni.updatetitle)

module.exports = routerUni