const users = require('./user');
const upload = require('../utils/transferData');
const receive = require('../twilio/send_sms');

module.exports = app => {
    app.use('/users',users);
    app.use('/upload',upload);
    app.use('/sms', receive)
}