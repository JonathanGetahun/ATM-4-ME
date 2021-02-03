const users = require('./user');

module.exports = app => {
    app.use('/users',users);
}