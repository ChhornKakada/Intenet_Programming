// used to read file
var fs = require('fs');
// var path = './db/users.json';

function addUser(filePath, user) {
  var users = JSON.parse(fs.readFileSync(filePath));
  if (!isUsernameExist(users, user.username)) {
    fs.writeFile(path, JSON.stringify([...users, user]), err => {
      if (err) {
        console.error(err);
      }
    });
  }
}

function isUsernameExist(users, username) {
  for (let user of users) {
    if (user.username == username) return true;
  }
  return false;
}

function isUserExist(Users, user) {
  for (let ele of Users) {
    if (ele.username == user.username && ele.password == user.password) {
      return true;
    }
  }
  return false;
}

module.exports = {addUser, isUsernameExist, isUserExist};