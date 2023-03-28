const { addUser, isUsernameExist, isUserExist } = require("./validation")

var express = require('express');
var router = express.Router();

var fs = require('fs');
var filePath = './db/users.json';

router.post('/', (req, res) => {
  console.log(req.body);
  const user = req.body;
  var users = JSON.parse(fs.readFileSync(filePath));
  
  if (isUserExist(users, user)) {
    res.json({
      msg: "Login Successfully!"
    })
  } else {
    res.status(401).json({
      msg: "Username or Password is incorrect!"
    })
  }
})

module.exports = router;
