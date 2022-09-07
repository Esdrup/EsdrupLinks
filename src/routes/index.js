const express = require('express')
const router = express.Router()
const {isLoggedOut} = require('../lib/is')
const indexController = require('../controllers/indexController')

router.get('/',isLoggedOut ,indexController.main)

module.exports = router