"use strict";

const bcrypt = require("bcryptjs");

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(password, salt, callback);
    }
  });
};

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, callback);
};

module.exports = {
  comparePasswords,
  hashPassword
};
