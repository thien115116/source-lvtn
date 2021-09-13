// Xây dựng các hàm liên qua đến xác thực người dùng
const randomString = require("../unit/randomString");
const crypto = require('crypto');

var sha512 = function(userPassword, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(userPassword);
  var value = hash.digest("hex");
  return {
    salt: salt,
    passwordhash: value,
  };
}

function _hashPassword(rawUserPassword) {
  let salt = randomString._randomSalt();
  var passwordData = sha512(rawUserPassword, salt);
  return passwordData;
}

function _verifyPassword(userpassword,salt){
    var passwordData = sha512(userpassword,salt);
    return passwordData;
}

module.exports = {
    _hashPassword: _hashPassword,
    _verifyPassword: _verifyPassword
}