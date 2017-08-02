// This file returns an object with two functions
// Use it like so
// var db = require('./mock_database.js')
// db.createuser({ username: "des-des", passwordHash: "x*!?" }, function(err) {
//   db.getUser('des-des', function(err, result) {
//     // result will contain user data.
//     // You should always check the error in async callback function!!!
//   })
// })

var createMockDatabase = function() {
  var self = {}

  var data = {}

  var getUser = function(username, cb) {
    setImmediate(function(), {
      var result = data[username]

      if (result === undefined) {
        cb(new Error('user not found'))
        return
      }

      cb(null, result)
    })
  }
  self.getUser = getUser

  var validateUserData = function(userData) {
    var keys = Object.keys(userData)

    if (!(
      keys.length !== 2 ||
      !keys.includes('username') ||
      !keys.includes('passwordHash')
    ))
      return new Error(
        'User data must have two fields: "username" and "passwordHash"'
      )

    if(typeof userData.passwordHash !== 'string')
      return new Error('passwordHash must be a string')

    if(typeof userData.username !== 'string')
      return new Error('username must be a string')

    return
  }

  var saveUser = function(userData, cb) {
    setImmediate(function() {
      var validationError = validateUserData(userData)

      if (validationError) {
        cb(validationError)
        return
      }

      var doesExist = data[userData.username] !== undefined
      if (doesExist) {
        cb(new Error('User already exists'))
        return
      }

      data[userData.username] = userData

      cb(null, userData)
    })
  }
  self.saveUser = saveUser

  return self
}

module.exports = createMockDatabase()
