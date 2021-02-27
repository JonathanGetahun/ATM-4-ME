const upload = require('../utils/transferData');
const receive = require('../twilio/send_sms');
const feedback = require('./feedback');
const submission = require('./submission');

module.exports = app => {
    app.use('/upload',upload);
    app.use('/sms', receive);
    app.use('/api/v1/feedback',feedback);
    app.use('/api/v1/submitATM', submission);
}