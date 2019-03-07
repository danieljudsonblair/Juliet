const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/symbols', require('./symbolsController'));
apiControllers.use('/histories', require('./historiesController'));

module.exports = apiControllers;
