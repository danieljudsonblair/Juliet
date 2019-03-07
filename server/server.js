/**
 * Project 3 Starter
 * UNC Charlotte Full-Stack Coding Bootcamp
 */

//-- .env --------------------------------------------------------------------
const path = require('path');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: path.resolve(__dirname, '.env')
  });
}

//-- Dependencies ------------------------------------------------------------
const express = require('express');
const logger = require('morgan');

const { passport } = require('./lib/passport');
const db = require('./models');

//-- Constants ---------------------------------------------------------------
const PORT = process.env.PORT || 3001;
const LOG_MODE = process.env.NODE_ENV === 'production' ? 'common' : 'dev';

//-- Express -----------------------------------------------------------------
const app = express();

//-- Middleware --------------------------------------------------------------
app.use(logger(LOG_MODE));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

//-- Static Server (Production) ----------------------------------------------
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
  console.log(`Client build path: ${clientBuildPath}\n`);
  app.use(express.static(clientBuildPath));
}

//-- Controller Routes -------------------------------------------------------
app.use(require('./controllers'));

//-- Main --------------------------------------------------------------------
db.sequelize.sync({ force: true })
  .then(() => db.User.create({ email: 'dan@gmail.com', password: 'test' }))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}...`);
    });    
  })
  .catch(err => console.log(err));

//-- Export to Tests ---------------------------------------------------------
module.exports = app;
