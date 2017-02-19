import jwt from 'jwt-simple';
import context from './Database/ContextInstance';
import getSecret from './Secret';
import {
  user,
  parseUser
} from './Endpoint/User';
import {
  internalError,
  tokenExpired,
  unathorize,
  invalidUser,
  invalidCredentials
} from './ResponseUtils';

function login(req, res) {
  const {
    email = '',
    password = ''
  } = req.body || '';
  if (email == '' || password == '') {
    return invalidCredentials(res);
  }
  // Fire a query to your DB and check if the credentials are valid
  return context.User.getAuthenticated(email, password).then((authenticatedUser) => {
    // If authentication is success, we will generate a token
    // and dispatch it to the client
    return getToken(authenticatedUser).then(tokenData => {
      res.json(tokenData);
    }).catch(() => {
      unathorize(res);
    });
  }).catch((error) => {
    invalidCredentials(res);
  });
}

function authorize(req, res, next) {
  // When performing a cross domain request, you will receive
  // a preflighted request first. This is to check if our the app
  // is safe. 
  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();
  const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  // keyOwner is an email
  const keyOwner = (req.body && req.body.x_key_owner) || (req.query && req.query.x_key_owner) || req.headers['x-key-owner'];
  if (token && keyOwner) {
    try {
      user.getOne(keyOwner).then(dbUser => {
        return getSecret(dbUser).then(secret => {
          return {
            decoded: jwt.decode(token, secret),
            dbUser
          };
        }).catch(() => {
          internalError(res);
        });
      }).then((authorization) => {
        const {
          decoded,
          dbUser
        } = authorization;
        if (decoded.expires <= Date.now()) {
          tokenExpired(res);
        }else {
          // Authorize the user to see if s/he can access our resources
          // var dbUser = validateUser(decoded.email); // The key would be the logged in user's username
          if (dbUser && dbUser.id && !dbUser.isLocked) {
            req.owner = dbUser;
            next(); // To move to next middleware
          } else {
            // No user with this name exists, respond back with a 401
            unathorize(res);
          }
        }
      }).catch(error => {
        invalidUser(res);
      });
    } catch (err) {
      internalError(res);
    }
  } else {
    return invalidUser(res);
  }
};

// private method
function getToken(dbUser) {
  const {
    id,
    email
  } = dbUser;
  const expires = expiresIn(7); // 7 days
  return new Promise((resolve, reject) => {
    getSecret(dbUser).then(secret => {
      const token = jwt.encode({
        expires,
        id,
        email
      }, secret);

      resolve({
        token,
        expires,
        user: parseUser(dbUser)
      });
    }).catch(reject);
  });
}

function expiresIn(days) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + days);
}

const auth = {
  login,
  authorize,
  getToken
};

module.exports = auth;