const axios = require('axios');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

/**
 * Future Direction to add more cities here.
 * 
 * {
 *  "Houston": {Lat, Lon},
 *  "NYC": {Lat, Lon},
 * etc...
 * }
 */

(async () => {

    regex = /(?<=\[).*(?=\])/

    try {
            const data = [];
            let found = "";
            //max pages allowed by American Express is 25
            for (let i = 1; i <= 25; i++){
                let url = `https://apigateway.americanexpress.com/digitalnetwork/v1/atms?callback=jQuery18009441462256932573_1611866472977&appKey=AF8DE528A59B33FBAD6C137A666E0786&applicationId=AXPDNGLOCP001&srvcAccKey=%40ys6n4NfNY5%23fA2Z&requestId=1&clientId=atoaDnCmsATMPoi&radius=50&radiusUnit=MI&resPageSize=100&poiType=ATM&pageNo=${i}&formatType=JSONP&latitude=38.9071923&longitude=-77.0368707&_=1611866680240`
                let response = await axios.get(url);
                if(i === 25){
                    found += response.data.match(regex);
                    break;
                }
                found += response.data.match(regex) + ",";
            }

            //used jsonformatter.org to prettify
            data.push(found)
            const jsonOutput = JSON.stringify(data);


            fs.writeFile(
                path.join(__dirname, '../data/DC-atm.json'),
                data,
                {flag: 'w'},
                (err) => {
                    if(err) throw err;
                    else logger.info("File created successfully")
                }
            );
         } catch (err) {
             logger.error(err)
         } 
})();


