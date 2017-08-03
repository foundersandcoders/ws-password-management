'use strict';

const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  // use bcrypt to hash the password and return it asynchronously
};

const comparePasswords = (password, hashedPassword) => {
  // use bcrypt to compare the passwords and return a boolean asynchronously
};

module.exports = {
  comparePasswords,
  hashPassword
};
