require('dotenv').config();
const logger = require('./logger')
const fs = require('fs');

const { Client } = require('@googlemaps/google-maps-services-js');

const test = [
    {
      "poiUniqueId": "5dab4b4070d1c00228b7f781",
      "poiSourceId": "TN74823",
      "poiName": "PAI",
      "poiSource": "1999999101",
      "poiType": "ATM",
      "poiAddressDetails": {
        "address": "1600 RHODE ISLAND AVE NW",
        "city": "WASHINGTON",
        "state": "DC",
        "countryCode": "US",
        "postalCode": "20036",
        "geoLocationDetails": {
          "latitude": "38.9066795",
          "longitude": "-77.0369311",
          "geoCodeProvider": "USER",
          "geoCodeAccuracy1": "USER",
          "geoCodeAccuracy2": "",
          "geoCodeAccuracy3": "",
          "geoCodeAccuracy4": ""
        }
      },
      "atmAttributes": {
        "rtNumber": "1999999101",
        "restrictedAccess": "N",
        "wheelchairAccess": " ",
        "brailleEnabled": " ",
        "noFee": " ",
        "chip": " ",
        "pin": " ",
        "balanceInquiries": " ",
        "depositAccepting": " ",
        "contactless": " ",
        "multiCurrency": " ",
        "withdrawlLimit": " ",
        "mobileTopup": " "
      },
      "distance": ".03558"
    },
    {
      "poiUniqueId": "1000400205",
      "poiSourceId": "LK652071",
      "poiName": "Courtyard-Dc Embassy Row",
      "poiSource": "1990004121",
      "poiType": "ATM",
      "poiAddressDetails": {
        "address": "1600 Rhode Island Avenue Nw",
        "city": "Washington",
        "state": "DC",
        "countryCode": "US",
        "countryName": "UNITED STATES OF AMERICA (THE)",
        "postalCode": "20036",
        "geoLocationDetails": {
          "latitude": "38.906662",
          "longitude": "-77.036974",
          "geoCodeProvider": "Google",
          "geoCodeAccuracy1": "OK",
          "geoCodeAccuracy2": "ROOFTOP",
          "geoCodeAccuracy3": "0",
          "geoCodeAccuracy4": "street_number"
        }
      },
      "atmAttributes": {
        "rtNumber": "1990004121",
        "restrictedAccess": "N",
        "wheelchairAccess": "N",
        "brailleEnabled": "N",
        "noFee": "Y",
        "chip": "N",
        "pin": "N",
        "balanceInquiries": " ",
        "depositAccepting": "N",
        "contactless": " ",
        "multiCurrency": " ",
        "withdrawlLimit": " ",
        "mobileTopup": " ",
        "bank": "Courtyard-Dc Embassy Row"
      },
      "distance": ".03706"
    },
    {
      "poiUniqueId": "5dab49e970d1c00228b63b45",
      "poiSourceId": "NH056732",
      "poiName": "ECLIPSE CASH SYSTEMS  LLC",
      "poiSource": "1999999101",
      "poiType": "ATM",
      "poiAddressDetails": {
        "address": "17001 RHODE ISLAND AVENUE",
        "city": "WASHINGTON",
        "state": "DC",
        "countryCode": "US",
        "postalCode": "20036",
        "geoLocationDetails": {
          "latitude": "38.9070427",
          "longitude": "-77.0379273",
          "geoCodeProvider": "USER",
          "geoCodeAccuracy1": "USER",
          "geoCodeAccuracy2": "",
          "geoCodeAccuracy3": "",
          "geoCodeAccuracy4": ""
        }
      },
      "atmAttributes": {
        "rtNumber": "1999999101",
        "restrictedAccess": "N",
        "wheelchairAccess": " ",
        "brailleEnabled": " ",
        "noFee": " ",
        "chip": " ",
        "pin": " ",
        "balanceInquiries": " ",
        "depositAccepting": " ",
        "contactless": " ",
        "multiCurrency": " ",
        "withdrawlLimit": " ",
        "mobileTopup": " "
      },
      "distance": ".05774"
    }]

const client = new Client({});

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


let str = "1135 16th St NW"
let city = "Washington, DC"
str += city;
/**
 * Test
 */
//Will convert string street adress to lat & long to compare w/ database atm's
let result = [];
fs.readFile()
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


    