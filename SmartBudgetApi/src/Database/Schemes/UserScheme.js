/* eslint-disable */
import bcrypt from 'bcryptjs';

const emptyFunction = (() => { });
const SALT_WORK_FACTOR = 15;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;

function getSalt() {
  const randomNumber = parseInt(Math.random() * 10000);
  return randomNumber % SALT_WORK_FACTOR;
}
const UserSchemePure = {
  name: { type: String, required: true, es_indexed: true },
  shortName: { type: String, es_indexed: true },
  email: { type: String, required: true, index: { unique: true }, es_indexed: true },
  birthday: Date,
  oauthId: String,
  roles: [String],
  isAdmin: { type: Boolean, default: false },
  salt: { type: String },
  password: { type: String, required: true },
  // Locking account for wrong authentications
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number, default: 0 }
};

const UserScheme = {
  ...UserSchemePure,
  $statics: {
    // expose enum on the model
    FailedLogin: {
      NOT_FOUND: 0,
      PASSWORD_INCORRECT: 1,
      MAX_ATTEMPTS: 2
    },
    getAuthenticated: function (email, password) {
      return new Promise((resolve, reject) => {
        this.findOne({ email }).then((user) => {
          // make sure the user exists
          if (!user) {
            reject({ error: { reason: UserScheme.$statics.FailedLogin.NOT_FOUND } });
            return;
          }

          // check if the account is currently locked
          if (user.isLocked) {
            // just increment login attempts if account is already locked
            return user.computeLoginAttempts()
              .then(reject)
              .catch(reject);
          }

          // test for a matching password
          user.comparePassword(password).then(() => {
            // if there's no lock or failed attempts, just return the user
            if (!user.loginAttempts && !user.lockUntil) return resolve(user);
            // reset attempts and lock info
            let updates = {
              $set: { loginAttempts: 0 },
              $unset: { lockUntil: 0 }
            };
            return user.update(updates).then(() => {
              resolve(user);
            }).catch((error) => {
              reject({ error });
            });
          }).catch((error) => {
            if (error.isMatch === false) {
              // password is incorrect, so increment login attempts before responding
              user.computeLoginAttempts().then(reject).catch(reject);
            } else {
              reject({ error });
            }
          });
        }).catch(reject);
      });
    }
  },
  $virtual: {
    isLocked: function () {
      // check for a future lockUntil timestamp
      return !!(this.lockUntil && this.lockUntil > Date.now());
    }
  },
  $methods: {
    comparePassword: function comparePassword(candidatePassword) {
      const user = this;
      return new Promise((resolve, reject) => {
        const { password } = user;
        user.password = candidatePassword;
        encrypt(user).then(hash => {
          user.password = password;
          if (password === hash) {
            resolve(hash);
          } else {
            reject();
          }
        }).catch((args) => {
          user.password = password;
          reject(args);
        });
      });
    },
    computeLoginAttempts: function computeLoginAttempts() {
      const user = this;
      return new Promise((resolve, reject) => {
        // if we have a previous lock that has expired, restart at 1
        if (user.lockUntil && user.lockUntil < Date.now()) {
          return user.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
          }).then(() => {
            reject({ error: { reason: UserScheme.$statics.FailedLogin.PASSWORD_INCORRECT } });
          }).catch(() => {
            reject({ error: { reason: UserScheme.$statics.FailedLogin.PASSWORD_INCORRECT } });
          });
        }
        // otherwise we're incrementing
        let updates = { $inc: { loginAttempts: 1 } };
        // lock the account if we've reached max attempts and it's not locked already
        const isLocked = user.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS;
        if (isLocked) {
          updates.$set = { lockUntil: Date.now() + LOCK_TIME };
        }
        return user.update(updates).then(() => {
          reject({
            error: {
              reason: isLocked
                ? UserScheme.$statics.FailedLogin.MAX_ATTEMPTS
                : UserScheme.$statics.FailedLogin.PASSWORD_INCORRECT
            }
          });
        }).catch(() => {
          reject({ error: { reason: UserScheme.$statics.FailedLogin.PASSWORD_INCORRECT } });
        });
      });
    }
  },
  $pre: {
    save: function save(next) {
      const user = this;
      // only hash the password if it has been modified (or is new)
      if (user.id && !user.isModified('password')) {
        next();
      } else {
        if (user.salt) {
          encrypt(user).then(hash => {
            user.password = hash;
            next();
          }).catch(next);
        } else {
          bcrypt.genSalt(getSalt(), (err, salt) => {
            if (err) {
              next(err);
            } else {
              user.salt = salt;
              encrypt(user).then(hash => {
                user.password = hash;
                next();
              }).catch(next);
            }
          });
        }
      }
    }
  }
};
/* eslint-enable */

function encrypt(user) {
  return new Promise((resolve, reject) => {
    bcrypt.hash([user.password, '|', user.email].join(''), user.salt, (errHash, hash) => {
      if (errHash) {
        reject(errHash);
      } else {
        resolve(hash);
      }
    });
  });
}

export default UserScheme;
