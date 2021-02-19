const Router = require('express-promise-router');
const router = new Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// twilio-cli 
// twilio phone-numbers:update "+14066928690" --sms-url="http://localhost:4000/sms"

const getNearest = require('../utils/calcNearest');

router.post('/', async function(req, res) {
    const { Body } = req.body;
    console.log(Body);
    const atms = await getNearest(Body)

    const twiml = new MessagingResponse();
    await twiml.message(`${atms}`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });



module.exports = router;