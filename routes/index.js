const users = require('./user');
const upload = require('../utils/transferData');
const receive = require('../twilio/send_sms');
const feedback = require('./feedback');

module.exports = app => {
    app.use('/users',users);
    app.use('/upload',upload);
    app.use('/sms', receive);
    app.use('/api/v1/feedback',feedback);
}