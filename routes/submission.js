require('dotenv').config();
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});
const db = require('../db');
const logger = require('../utils/logger');

const { insertValues,
        checkAddress,
        addSubmission } = require('../db/queries')
/**
 * Import queries from ./db folder
 */

const Router = require('express-promise-router');

const router = new Router();

module.exports = router;

/**
 * Potentially modularize code. 
 * 
 * Adds to tables submission and atms. Decided not to use foreign key until 
 * app expands, will use address as unique variable. 
 * 
 * Future: if not valid/can't be found on google api. Let user know their
 * submission is being reviewed by admin.
 */


//test
router.post('/', (req,res) => {
    const { email, fullName, atmName, address, cityState, postalCode, comment,
            restricted, wheelchair, brail, fee, chip, deposit} = req.body;
    
    const fullAddress = address + " " + cityState;
    //checks to see if address is in atms
    db.query(checkAddress, [address])
        .then((found) => {
            if(found.rows.length > 0){
                res.status(405).send("already exists");
            }else {
                client.geocode({
                    params:{
                        address:fullAddress,
                        key:process.env.GOOGLE_MAPS_API_KEY
                    }
                }).then((coordinates) => {
                    //adds coordinates into atms table for later use
                    var latitude = coordinates.data.results[0].geometry.location.lat;
                    var longitude = coordinates.data.results[0].geometry.location.lng;
                    return [latitude, longitude]
                }).then((values) => {
                    return db.query(insertValues, [atmName,'atm',address,postalCode,restricted,wheelchair,brail,fee,chip,deposit,values[0],values[1]])
                        .then(() => {
                            return db.query(addSubmission,[email,fullName,address,comment])
                                .then(() => {
                                    logger.info("inserted into submission table");
                                    res.status(200).send("inserted into submission table");
                                })
                                .catch((err) => {
                                    // throw err
                                    logger.info(err)})
                        })
                        .catch((err) => {
                            // throw err
                            logger.info(err)
                        });

                })  
            }
        })
        .catch(err => {throw err;})
});
