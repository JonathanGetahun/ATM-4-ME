//6371 if km, 3959 if mi
//gets the raw abs distance
const nearestATM = `
    SELECT id, name, type, address, postalCode, restricted, wheelchair, brail, fee, chip, deposit, lat, lng,
    (3959 * acos(cos(radians($1)) * cos(radians(lat)) * cos(radians(lng) - radians($2) ) + sin(radians($1)) * sin(radians(lat)))) 
    AS distance 
    FROM atms
    ORDER BY distance
    LIMIT $3`;


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

module.exports = {
    nearestATM, 
    create_atm_table
}