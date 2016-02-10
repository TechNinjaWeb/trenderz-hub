// User Schema
var mongo = require('mongoose'),
    Schema = mongo.Schema;
    
var User = new Schema({
    created: {type: Date, default: Date.now},
    username: {
        type: 'String',
        required: true,
        unique: true
    },
    firstname: String,
    lastname: String,
    password: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    roles: Array
});
// var User = {};
//     User.methods = {};
// Schema Methods
User.methods.hasRole = function (role) {
  for (var i = 0; i < this.roles.length; i++) {
    if (this.roles[i] === role) {
      // if the role that we are checking matches the 'role' we are
      // looking for return true
      return true;
    }
  }
  // if the role does not match return false
  return false;
};
// Sanitize the data being saved
User.methods.sanitize = function (data) {
  // Avoid Manual Role Modification
  if (this.roles) this.roles = [];
  if (data && data.hasOwnProperty('roles')) data.roles = [];
  // Chain
  return this;
};

User.statics.search = function search (query, cb) {
  return this.where(query[0], new RegExp(query[1], 'i')).exec(cb);
}

module.exports = mongo.model('User', User);