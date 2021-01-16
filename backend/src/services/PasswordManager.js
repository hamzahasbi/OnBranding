const { randomBytes, pbkdf2Sync } = require('crypto');

const hashPassword = (password) => {

  // @TODO SALT must be generated globally or included in the config.
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');

  return {
    hash,
    salt,
  };
};

const validatePassword = (
  hash,
  password
) => {
  const salt = randomBytes(16).toString('hex');
  const h = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');
  console.log(hash, h)
  return hash === h;
};


module.exports = {
    hashPassword,
    validatePassword
}