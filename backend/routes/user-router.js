const express = require('express')
var bodyParser = require('body-parser')
const UserController = require('../controllers/user-controller')

const router = express.Router()
var jsonParser = bodyParser.json()

router.post('/user', jsonParser, UserController.createUser)
router.get('/user/:id', jsonParser, UserController.getUserById)


module.exports = router