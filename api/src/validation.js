
// check if the username has already token
function isUsernameExist(users, username) {
  for (let user of users) {
    if (user.username == username)
      return true;
  }
  return false;
}

// check when login
function validateCredentials(users, user) {
  for (let tmpUser of users) {
    if (tmpUser.username == user.username && tmpUser.password == user.password)
      return true;
  }
  return false;
}

module.exports = {isUsernameExist, validateCredentials};