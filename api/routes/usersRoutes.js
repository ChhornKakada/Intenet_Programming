const express = require('express')
const route = express.Router()

// import these function
// var {listAllUsers, createAUser} = require('../controllers/usersController');

// import all function as object "users"
var users = require('../controllers/usersController');

route.get('/', users.listAllUsers)
route.post('/', users.createAUser)

module.exports = route