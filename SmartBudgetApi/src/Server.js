import dotenv from 'dotenv';
dotenv.config();

import https from 'https';
import fs from 'fs';
import path from 'path';
import express from 'express';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import logger from 'morgan';
import compression from 'compression';

import context from './Database/ContextInstance';
import privateRouter from './PrivateRouter';
import publicRouter from './PublicRouter';
import auth from './Auth';

const credentials = {
  key: fs.readFileSync('./local.smartbudget.key'),
  cert: fs.readFileSync('./local.smartbudget.crt')
};

const app = express();

// compress responses 
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/public/api/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
app.use('/public/api/', publicRouter);

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [auth.authorize]);
app.use('/api/v1/', privateRouter);

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start the server
app.set('port', process.env.PORT);
app.set('host', process.env.HOST);

const server = https.createServer(credentials, app).listen(app.get('port'), app.get('host'), () => {
  console.log('Express server listening on port ' + server.address().port);
});
