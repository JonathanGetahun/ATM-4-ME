const users = require('./user');
const upload = require('../utils/transferData');

module.exports = app => {
    app.use('/users',users);
    app.use('/upload',upload);
}