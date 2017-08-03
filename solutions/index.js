'use strict';

const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) callback(err);
    else {
      bcrypt.hash(password, salt, (err, hash) => {
        callback(null, hash);
      });
    }
  });
};

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) callback(err);
    else {
      callback(null, res);
    }
  })
};

module.exports = {
  comparePasswords,
  hashPassword
};
