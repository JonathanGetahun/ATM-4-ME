require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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
//406-MYATM-90

createResponse('1150 Maine Ave SW, Washington, DC').then((res) => {
        let finalATM = "Here are the 3 closest atms!\n\n"
        res.forEach(atmString => {
        finalATM += `${atmString}\n`})

        client.messages
        .create({
           body: `${finalATM}`,
           from: '+14066928690',
           to: '+12818572472'
         })
        .then(message => console.log(message.sid));         
}).catch(err => console.log(err))
