// requires is the same meaning as import after export file
const { json } = require('express');
const User = require('../models/usersModel')
const validation = require('../src/validation')

// list all users
async function listAllUsers(req, res) {
  try {
    return res.json(await User.find());
  } catch (error) {
    return res.json({ message: error.message })
  }
};

// create a new user
async function createAUser(req, res) {
  try {
    var newUser = new User(req.body);
    var userList = await listAllUsers(req, res);
    var userList = JSON.parse(userList);

    if (!validation.isUsernameExist(userList, newUser.username)) {
      var justAdd = await newUser.save();
      return res.json(justAdd);
    } else {
      return res.status(401).json({
        msg: "Username has already token!"
      })
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

// get a user
function readAUser(req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

// exports.readAUser = function (req, res) {
//   User.findById(req.params.userId, function (err, user) {
//     if (err)
//       res.send(err);
//     res.json(user);
//   });
// };

// module.exports.listAllUsers = listAllUsers;
module.exports = { listAllUsers, createAUser, readAUser }