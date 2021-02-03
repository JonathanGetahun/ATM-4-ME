const Router = require('express-promise-router');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

module.exports = router;

router.get('/', async(req,res) => {
    // const { id } = req.params
    const result = await db.query('SELECT NOW()');
    console.log(result);
    res.send(result);
})