'use strict';

const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  // use bcrypt to hash the password and return it asynchronously
  return Promise.resolve('hashed password?');
};

const comparePasswords = (password, hashedPassword) => {
  // use bcrypt to compare the passwords and return a boolean asynchronously
  return Promise.resolve('oops');
};

module.exports = {
  comparePasswords,
  hashPassword
};
