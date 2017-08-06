'use strict'

require('dotenv').config()

const { hashPassword, comparePasswords } = require('./index.js')

test('password is being hashed correctly', () =>
  hashPassword('wehey', (err, res) => {
    expect(res.substring(0, 4)).toBe('$2a$')
  })
)

test('passwords are being validated correctly - pass', () =>
  hashPassword('pa$$w0rd', (err, hashedPw) => {
    comparePasswords('pa$$w0rd', hashedPw, (err, correct) => {
      expect(correct).toBe(true)
    })
  })
)

test('passwords are being validated correctly - pass', () =>
  hashPassword('pa$$w0rd', (err, hashedPw) => {
    comparePasswords('WRONG', hashedPw, (err, correct) => {
      expect(correct).toBe(false)
    })
  })
)
