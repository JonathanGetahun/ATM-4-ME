const Router = require('express-promise-router');
const router = new Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// twilio-cli 
// twilio phone-numbers:update "+14066928690" --sms-url="http://localhost:4000/sms"

router.post('/', function(req, res) {
    console.log(req);
    const twiml = new MessagingResponse();
    twiml.message('The Robots are coming! Head for the hills!');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });



module.exports = router;
