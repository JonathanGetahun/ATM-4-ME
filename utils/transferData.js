const data = require('../data/DC-atm.json');
const db = require('../db');

const Router = require('express-promise-router');

const router = new Router();

module.exports = router;

/**
 * CREATES ATM TABLE
 */
// db.query(dropTable_atms)
//     .then(() => db.query(create_atm_table))
//     .then(() => db.query(createIndLat))
//     .then(() => db.query(createIndLng))
//     .then(() => {
//         const query = data.map((d) => new Promise((resolve,reject) => {
//         const values = [d.poiName, d.poiType, d.poiAddressDetails.address, 
//             d.poiAddressDetails.postalCode, d.atmAttributes.restrictedAccess, 
//             d.atmAttributes.wheelchairAccess, d.atmAttributes.brailleEnabled, 
//             d.atmAttributes.noFee, d.atmAttributes.chip, d.atmAttributes.depositAccepting, 
//             d.poiAddressDetails.geoLocationDetails.latitude, 
//             d.poiAddressDetails.geoLocationDetails.longitude]

            
//             db.query(insertValues, values)
//                 .then(() => resolve())
//                 .catch(err => console.log(err))
//         }))

//         return Promise.all(query)  
//     }).then((res) => console.log(res))
//         .catch(err => console.log(err))

//test
// router.get('/', (req,res) => {

//     const { email, fullName, atmName, address, cityState, comment,
//             restricted, wheelchair, brail, fee, chip, deposit} = req.body;
//     db.query(checkAddress, ['1600 RHODE ISLAND AVE NW'])
//         .then((found) => {
//             if(found > 0){
//                 res.status(405).send("already exists")
//             }else {
//                 db.query(insertValue, [])
//             }
//         })
//         .catch(err => {throw err;})
// })




