

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  }, 
  password: {
    type: String,
  },
  username: {
    unique: true,
    type: String,
  }
});

// export "UserSchema" as "Users"
module.exports = mongoose.model('Users', UserSchema);