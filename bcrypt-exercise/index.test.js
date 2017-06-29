'use strict'

require('dotenv').config()

const { promisify } = require('util')

const { hashPassword, comparePasswords } = require('./index.js')

const hash =
  process.env.CALLBACK_MODE === 'true'
    ? promisify(hashPassword)
    : hashPassword

const compare =
  process.env.CALLBACK_MODE === 'true'
    ? promisify(comparePasswords)
    : comparePasswords

test('password is being hashed correctly', () =>
  hash('wehey')
  .then(
    res =>
      expect(res.substring(0, 4)).toBe('$2a$')
  )
)

test('passwords are being validated correctly - pass', () =>
  hash('pa$$w0rd')
  .then(
    hashedPw =>
      compare('pa$$w0rd', hashedPw)
      .then(
        correct =>
          expect(correct).toBe(true)
      )
  )
)

test('passwords are being validated correctly - fail', () =>
  hash('pa$$w0rd')
  .then(
    hashedPw =>
      compare('WRONG', hashedPw)
      .then(
        correct =>
          expect(correct).toBe(false)
      )
  )
)
