require('dotenv').config();
const logger = require('./logger')

const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

const db = require('../db');
const { nearestATM } = require('../db/queries');

/**
 * New col that has haversine dist, return the top 3 after ordering
 */


function getNearest(userAddress) {

    return client.geocode({
        params:{
            address:userAddress,
            key:process.env.GOOGLE_MAPS_API_KEY
        }
    })
        .then(resolved => {
            //get lat and lng from user input
            var latitude = resolved.data.results[0].geometry.location.lat;
            var longitude = resolved.data.results[0].geometry.location.lng;
            return [latitude, longitude]
        }).then((response) => {
            //query db to get shortest distance addresses 
            return db.query(nearestATM, [response[0],response[1],3])
                .then((res) => {
    
                    const newDist = res.rows.map(atm => new Promise((resolve,reject) => {
    
                        client.distancematrix({
                            params:{
                                origins:[{lat:response[0],lng:response[1]}],
                                destinations: [{lat:atm.lat,lng:atm.lng}],
                                key:process.env.GOOGLE_MAPS_API_KEY,
                            }
                        }).then((res) => {
                            //gets distance text from distancematrix api result array
                            resolve({...atm, text:res.data.rows[0].elements[0].distance.text})
                        }).catch(err => reject(err))
                    }))
                        return Promise.all(newDist);
                    
                }).then(res => {
                    return res
                }).catch(err => logger.error(err))
    
        }).then(res => {
            return res
        }).catch(err => logger.error(err))

}


module.exports = getNearest;


