'use strict';

const bcrypt = require('bcryptjs');

// const hashPassword = password => {
//   // use bcrypt to hash the password and return it asynchronously
//
//   bcrypt.hash(password, 10, function(err, hash) {
//     console.log('hash:', hash);
//   });
//
//   return Promise.resolve(hash);
// };

const hashPassword = password => {
  // use bcrypt to hash the password and return it asynchronously
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hash) {
      console.log('hash:', hash);
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

// const comparePasswords = (password, hashedPassword) => {
//   // use bcrypt to compare the passwords and return a boolean asynchronously
//   console.log('compare:', bcrypt.compareSync(password, hashedPassword));
//   // return Promise.resolve('oops');
// };

const comparePasswords = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, function(err, bool) {
      console.log(bool);
      if (err) {
        reject(err);
      } else {
        resolve(bool);
      }
    });
  });
};

// hashPassword('password');
// comparePasswords(
//   'password',
//   '$2a$10$1yjDJag20y1oJfUoFXq6kOZ/0oYolU7ryOKTZOsS7lDa6vts8/omq'
// );

module.exports = {
  comparePasswords,
  hashPassword,
};
