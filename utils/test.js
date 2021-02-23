require('dotenv').config();
const logger = require('./logger')

const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});


const test = [
    {
      id: 1501,
      name: 'Wharf Virgo Fish Cleaning House',
      type: 'ATM',
      address: '1100 Maine Ave Sw',
      postalcode: '20024',
      restricted: 'N',
      wheelchair: 'N',
      brail: 'N',
      fee: 'Y',
      chip: 'N',
      deposit: 'N',
      distance: 0.04023551794814876
    },
    {
      id: 1534,
      name: "Mtc Merchant Services Phillip's Flagship Restaurant",
      type: 'ATM',
      address: '900 Water Street, Southwest',
      postalcode: '20024',
      restricted: 'N',
      wheelchair: 'N',
      brail: 'N',
      fee: 'Y',
      chip: 'N',
      deposit: 'N',
      distance: 0.0886457989570106
    },
    {
      id: 1419,
      name: 'Narfe Premier Federal Credit Union',
      type: 'ATM',
      address: '445 12Th Street Sw',
      postalcode: '20554',
      restricted: 'N',
      wheelchair: 'N',
      brail: 'N',
      fee: 'N',
      chip: 'N',
      deposit: 'N',
      distance: 0.15996456187019462
    }
  ]

    latitude = 38.8809629,
    longitude = 77.0283309


  let lat =38.932384
  let lng=77.024146


//   const newDist = test.map(atm => new Promise((resolve,reject) => {
//       console.log(atm)
//     return resolve( client.distancematrix({
//         params:{
//             origins:geo1,
//             destinations: geo,
//             key:process.env.GOOGLE_MAPS_API_KEY,
//         }
//     }).then((res) => {
//         //gets distance text from distancematrix api result array
//         resolve(1)
//         console.log(res.rows[0].elements.distance.text)
//     }).catch(err => reject(err)))
// }))

// console.log(newDist)
// console.log( Promise.all(newDist))



// function slow(){
//     setTimeout(() => {
//         console.log( "hi")
//     },1000)
// }

// const d = test.map(atm => new Promise((resolve,reject) => {
//     console.log(atm)
//     resolve("w")
// }))

// console.log(d)

// client.distancematrix({
//     params:{
//         origins:[{lat: 38.8809629, lng: -77.0283309}],
//         destinations:[{lat: 38.932384, lng: -77.024146}],
//         key:process.env.GOOGLE_MAPS_API_KEY,
//     }
// }).then((res) => {
//     //gets distance text from distancematrix api result array
//     console.log(res.data.rows[0].elements)
// }).catch(err => console.log(err))



async function getNearest(userAddress) {

    const trial = await client.geocode({
        params:{
            address:userAddress,
            key:process.env.GOOGLE_MAPS_API_KEY
        }
    })

            // console.log(resolved.data,"NOT RECEIVING DATA HERE", resolved.data.results)
            var latitude = trial.data.results[0].geometry.location.lat;
            var longitude = trial.data.results[0].geometry.location.lng;
            return [latitude, longitude]


  }

// (async() => {
//     try{
//         const ad = await getNearest('1150 Maine Ave SW, Washington, DC');
//         let final = '';
//         // ad.forEach(atmString => {
//         //   final += `${atmString}\n`
//         // })
//         console.log(ad)
//     } catch(e) {
//         logger.error(e)
//     }
// })();
module.exports = getNearest