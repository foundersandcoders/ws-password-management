## Password Management

### Learning outcomes
Understand:
+ why to avoid storing plaintext passwords
+ why a password should be hashed before being stored
+ which hashing algorithms should be used and why
+ what a 'salt' is and why it is useful
+ how salts should be generated and used
+ how bcrypt works

Be able to implement the following:
+ generate a random salt (using bcrypt.js)
+ hash a password (using bcrypt.js)
+ compare it (using bcrypt.js) to the user input

---

### Plaintext Dangers
When storing user passwords, the first consideration is to not store them in plaintext (ie storing the actual password). Some reasons for this:
1. If your user data is compromised, the attackers will not only be able to log in with a user's password, but as people often reuse passwords, the users could also be comprimised elsewhere. prevents escalation of a read only attack
2. The passwords are visible to anyone who has access to the database.

If a website has ever emailed you your password, they are likely to be storing it in plaintext. Unfortunately this is [very common](http://plaintextoffenders.com/).

So when a user is trying to log in, how can you validate their password, if you do not want to store their password? Well, that involves hashing.

### What is hashing?
Hashing is when you take one string, known as the _message_, (eg a plaintext password), and run an algorithm (e.g. MD5, SHA256) on it which changes it into a different string (the _digest_). A hash function should be fast to execute and slow (or impossible) to reverse.

Hashing is deterministic, meaning every time you run the same algorithm on the same string you will get the same result back. This is why you can store the digest in the database and check it against a password that a user may submit through a login form, for example.

Here is an example of hashing in Node.js using the built-in [crypto library](https://nodejs.org/api/crypto.html).
```
const { createHash } = require('crypto');

const hashedPassword = createHash('sha256').update('pa$$w0rd').digest('hex');
// '4b358ed84b7940619235a22328c584c7bc4508d4524e75231d6f450521d16a17'

// And here is what a comparison function would look like:
const comparePasswordWithHash = (password, hashedPassword) => {
  return hashedPassword === createHash('sha256').update(password).digest('hex');
};

```

### What are the different hashing options?

There are several different ways to implement hashing and here is an explanation of them and short examples using Node.js.

__1. Simple hash__

```
crypto.createHash('sha256').update('pa$$w0rd').digest('hex');
```
This is somewhat better than storing a plaintext password, but is not that great due to the fact that one computer can compute billions of hashes per second. In fact, huge databases of pre-computed hashes of the most common passwords already exist. These are known as 'rainbow tables'. 6.5 million LinkedIn passwords were hacked in 2012. While they were hashed, they were not 'salted' and were therefore eventually all cracked.

__2. Hash with a fixed salt__
```
crypto.createHash('sha256').update('3c82766e7fe083d96eff7f7a' + 'pa$$w0rd').digest('hex');
```
This is where you add something known as a 'salt'. A salt is a long string of random bytes, added to the password before hashing, to alter the resulting hash. A fixed salt will prevent an attacker using rainbow tables against your hashes. It will also not be possible to brute force the hashes without the salt. However, the salt would be stored in your database or in an environment variable, and if your server has been compromised, it is likely the attacker knows the salt also.

__3. Hash with per user salt__
```
const randomString = crypto.randomBytes(12).toString('hex');

crypto.createHash('sha256').update(randomString + 'pa$$w0rd').digest('hex');
```
Generating a new salt for each new hash is another improvement. You create the salt, create the hash, then store both of them in the database together to be used when a user tries to log in. This means that even in the event of an attacker getting a database dump, each password would have to be brute forced individually.

__4. bcrypt__  
bcrypt (paper [here](http://www.openbsd.org/papers/bcrypt-paper.ps)) is a hash function that was specifically designed for passwords, and designed to be _very slow_.

It does this by executing an internal encryption/hash function many times in a loop. bcrypt is 10,000x slower than SHA1. 100ms, for example, is fast enough that the user won't notice when they log in, but slow enough to make brute force attacks against the hash much more expensive.

How long bcrypt takes to execute can actually be configured, by telling it how many 'rounds' of its internal hash function to execute. This number is logarithmic so the execution time increases quite sharply. This makes bcrypt future proof, as while computers get faster, the number of rounds can be increased.

bcrypt has a 'per user salt' feature built into it, and the salt is added to the result string, so there's no need to store the salt and the hashed password separately.

```
// bcrypt string breakdown:
$2a$10$045/Zc6RrMraKbXdEJuRS.g0KB3iChSj5RP2oUQCzXF/FgLmVbmwW

$ 2a        $ 10               $ 045/Zc6RrMraKbXdEJuRS.g0KB3iChSj5RP2oUQCzXF/FgLmVbmwW
$ bcrypt id $ number of rounds $ 128 bit salt         . 184 bit hash
```

### Exercise: Implement `bcryptjs`

Now for some actual coding. In the `bcrypt-exercise` folder, you will find everything you need.

__Steps:__
1. Have a quick read of the `bcryptjs` documentation [here](https://www.npmjs.com/package/bcryptjs). `bcryptjs` is a pure JavaScript implementation of `bcrypt` (as opposed to the JavaScript/C++ [`bcrypt`](https://www.npmjs.com/package/bcrypt) npm package).
2. `$ npm install`
3. In `index.js`, implement the functions `hashPassword`, and `comparePasswords`, so that the tests in `index.test.js` pass. `hashPassword` accepts a `String`, and should asynchronously return a `String`. `comparePasswords` accepts two `String`s and returns a `Boolean`, also asynchronously.

__Notes:__
- You can run the tests once using `npm test`, or in watch mode using `npm run test:watch`.
- `bcryptjs` supports both callbacks and promises (you can also use it synchronously, but that is definitely not recommended). See the documentation for more information.
- Try to understand each step, why you are doing it, and what the terms 'salt' and 'round' mean in the context of the library.

### Resources:
http://dustwell.com/how-to-handle-passwords-bcrypt.html
