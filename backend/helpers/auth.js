const bcrypt = require("bcrypt");

//pass password as paramter else
//password not defined error
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject;
        } else {
          resolve(hash);
        }
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
