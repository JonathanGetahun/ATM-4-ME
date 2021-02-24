const { Pool } = require('pg');
const data = require('../data/DC-atm.json');
const db = require('../db');

const Router = require('express-promise-router');

const router = new Router();

module.exports = router;
/**
 * Table atm
 * primary key - address - lat - lng 
 * 
 * Table attributes
 * restricted access - wheelchair access - brail Enabled - no Fee - chip - deposit accepting - bank
 * 
 * Table user
 */

 const dropTable = "DROP TABLE IF EXISTS atms";
 const createIndLat = "CREATE INDEX idx_lat ON atms(lat)";
 const createIndLng = "CREATE INDEX idx_lng ON atms(lng)";

 const create_atm_table = `CREATE TABLE atms (
     id SERIAL PRIMARY KEY,
     name VARCHAR,
     type VARCHAR,
     address VARCHAR,
     postalCode VARCHAR,
     restricted VARCHAR,
     wheelchair VARCHAR,
     brail VARCHAR,
     fee VARCHAR,
     chip VARCHAR,
     deposit VARCHAR,
     lat REAL,
     lng REAL
     )`;

const insertValues = `INSERT INTO atms(name,type,address,postalCode,restricted,wheelchair,brail,fee,chip,deposit,lat,lng) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;

const createFeedback = `CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    feedback VARCHAR
)`


/**
 * USE THIS TO CREATE ATM TABLE
 */
// db.query(dropTable)
//     .then(() => db.query(create_atm_table))
//     .then(() => db.query(createIndLat))
//     .then(() => db.query(createIndLng))
//     .then(() => {
//         const query = data.map((d) => new Promise((resolve,reject) => {
//         const values = [d.poiName, d.poiType, d.poiAddressDetails.address, d.poiAddressDetails.postalCode, d.atmAttributes.restrictedAccess, d.atmAttributes.wheelchairAccess, d.atmAttributes.brailleEnabled, d.atmAttributes.noFee, d.atmAttributes.chip, d.atmAttributes.depositAccepting, d.poiAddressDetails.geoLocationDetails.latitude, d.poiAddressDetails.geoLocationDetails.longitude]

//             db.query(insertValues, values)
//                 .then(() => resolve())
//                 .catch(err => console.log(err))
//         }))

//         return Promise.all(query)  
//     }).then((res) => console.log(res))
//         .catch(err => console.log(err))

//test
router.get('/', (req,res) => {
    db.query(createFeedback).then(() => console.log("created feedback"))
    .catch(err => console.log(err))
})




