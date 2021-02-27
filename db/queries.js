//6371 if km, 3959 if mi
//gets the raw abs distance
const nearestATM = `
    SELECT id, name, type, address, postalCode, restricted, wheelchair, brail, fee, chip, deposit, lat, lng,
    (3959 * acos(cos(radians($1)) * cos(radians(lat)) * cos(radians(lng) - radians($2) ) + sin(radians($1)) * sin(radians(lat)))) 
    AS distance 
    FROM atms
    ORDER BY distance
    LIMIT $3`;

const dropTable_atms = "DROP TABLE IF EXISTS atms";
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

const insertValues = `INSERT INTO 
atms(name,type,address,postalCode,restricted,wheelchair,brail,fee,chip,deposit,lat,lng) 
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;

const insertFeedback = `INSERT INTO feedback(
    email,
    feedback
) VALUES($1,$2)`;

const createFeedback = `CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    feedback VARCHAR
)`;

const createSubmission = `
    CREATE TABLE submission (
        id serial primary key,
        received_at timestamp DEFAULT NOW(),
        email VARCHAR NOT NULL,
        fullname VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        comment VARCHAR
    )
    `;

//currently only checking address, in the future will check
//fullAddress(+city,state) when app expands with more locations.
const checkAddress = `
    SELECT * 
    FROM atms
    WHERE UPPER(address) = UPPER($1)
`;


const addSubmission = `
    INSERT INTO submission(email,fullname,address,comment)
    VALUES($1,$2,$3,$4)
`;


const createUsers = `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        phoneNumber VARCHAR
    )
`;


const addUser = `
    INSERT INTO users (phoneNumber)
    VAlUES ($1)
`;

const deleteUser = `
    DELETE FROM users 
    WHERE phoneNumber = $1
`;

const checkUser = `
    SELECT * FROM users
    WHERE phoneNumber = $1
`;

module.exports = {
    nearestATM, 
    dropTable_atms,
    createIndLat,
    createIndLng,
    create_atm_table, 
    insertValues,
    insertFeedback,
    createFeedback,
    createSubmission,
    checkAddress,
    addSubmission,
    createUsers,
    addUser,
    deleteUser,
    checkUser
}