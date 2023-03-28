const { addUser, isUsernameExist, isUserExist } = require("./validation")

var express = require('express');
var router = express.Router();

var fs = require('fs');
var filePath = './db/users.json';

router.post('/', (req, res) => {
  console.log(req.body);
  // const msg = "";
  const user = req.body;
  var users = JSON.parse(fs.readFileSync(filePath));
  console.log(isUsernameExist(users, user.username));
  if (!isUsernameExist(users, user.username)) {
    fs.writeFile(filePath, JSON.stringify([...users, user]), err => {
      if (err) {
        console.error(err);
      }
    });
    res.json({
      msg: "Hello from Register world!"
    })
  } else {
    res.status(401).json({
      msg: "Username has already token!"
    })
  }
})

module.exports = router;