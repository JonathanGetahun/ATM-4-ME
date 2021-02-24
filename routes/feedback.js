const Router = require('express-promise-router');
const router = new Router();
const { insertFeedback } = require('../db/queries');
const db = require('../db');

router.post('/', async (req,res) => {
    const { email, message } = req.body;

    const result = await db.query(insertFeedback, [email,message])

    res.status(200).send(result);
})

module.exports = router