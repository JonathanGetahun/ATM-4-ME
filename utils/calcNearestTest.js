require('dotenv').config();
const logger = require('./logger')
const fs = require('fs');
const path = require('path');

const { Client } = require('@googlemaps/google-maps-services-js');
const { on } = require('process');
const client = new Client({});

const db = require('../db');

const haversineDistance = ([lat1, lon1], [lat2, lon2], isMiles = true) => {
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);

    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

    if (isMiles) {
      finalDistance /= 1.60934;
    }

    return finalDistance;
  };


test2 = [];


let str = "1150 Maine Ave SW";
let city = "Washington, DC";
str += city;

/**
 * Test
 */
//Will convert string street adress to lat & long to compare w/ database atm's
// let readStream = fs.createReadStream(path.join(__dirname, '../data/DC-atm.json'), 'utf8')

// readStream.on('data', (chunk) => {
//     rawData.push(chunk)
// }).on('end', () => logger.info("ATM locations fetched"))


/**
 * Test 
 * 
 * Use AWS RDS to query for location 
 */




client.geocode({
    params:{
        address:str,
        key:process.env.GOOGLE_MAPS_API_KEY
    }
})
    .then(res => {
        let { lat, lng } = res.data.results[0].geometry.location;
        let currMin = Infinity;
        let minIdx = 0;

    
        test.forEach( (atm,idx) => {
            let atmLAT = atm.poiAddressDetails.geoLocationDetails.latitude;
            let atmLNG = atm.poiAddressDetails.geoLocationDetails.latitude;

            //use Haversine distance to find closest locations
            if (haversineDistance([lat,lng], [atmLAT, atmLNG]) < currMin) {
                currMin = haversineDistance([lat,lng], [atmLAT, atmLNG]); 
                minIdx = idx;
            }
                
        })
        result.push([test[minIdx].poiName, test[minIdx].poiAddressDetails.address, test[minIdx].atmAttributes])
        logger.info(result)
    })
    .catch(err => logger.error(err))


    