'use strict';

const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  // use bcrypt to hash the password and return it asynchronously
  callback(new Error('TODO'));
};

const comparePasswords = (password, hashedPassword, callback) => {
  // use bcrypt to compare the passwords and return a boolean asynchronously
  callback(new Error('TODO'));
};

module.exports = {
  comparePasswords,
  hashPassword
};
