const Router = require('express-promise-router');
const router = new Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const logger = require('../utils/logger');
// twilio-cli 
// twilio phone-numbers:update "+14066928690" --sms-url="http://localhost:4000/sms"

const getNearest = require('../utils/calcNearest');

const createResponse = async (body) => {
  try{
    const values = await getNearest(body);
    const atmToString = values.map((atm,idx) => new Promise((resolve, reject) => {
      resolve(`\n(${idx + 1})\n
              name: ${atm.name}\n
              address: ${atm.address}\n
              distance: ${atm.text}\n
              atm features (Y = yes, N = no, n/a = not available)\n
              restricted: ${atm.restricted === ' ' ? 'n/a' : atm.restricted}\n
              wheelchair: ${atm.wheelchair === ' ' ? 'n/a' : atm.wheelchair}\n
              brail: ${atm.brail === ' ' ? 'n/a' : atm.brail}\n
              fee: ${atm.fee === ' ' ? 'n/a' : atm.fee}\n
              chip: ${atm.chip === ' ' ? 'n/a': atm.chip}\n
              deposit: ${atm.deposit === ' ' ? 'n/a' : atm.deposit}`)
    }))

    return Promise.all(atmToString)
  } catch(err) {
    console.log(err)
  }
  
}

// (async() => {
//     try{
//         const ad = await createResponse('1150 Maine Ave SW, Washington, DC');
//         let final = '';
//         ad.forEach(atmString => {
//           final += `${atmString}\n`
//         })
//         console.log(final)
//     } catch(e) {
//         logger.error(e)
//     }
// })();

router.post('/',  async function(req, res) {
    const { Body } = req.body;
    console.log(Body.toLowerCase());
    // const atms = await getNearest(Body)
      const getATMS = await createResponse(Body.toLowerCase);
      let finalATM = 'Heare are the 3 closest atms!\n\n';
      getATMS.forEach(atmString => {
        final += `${atmString}\n`
      })
      const twiml = new MessagingResponse();
      twiml.message(`${finalATM}`);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
  );



module.exports = router;