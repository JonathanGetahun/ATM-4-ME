const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');


app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res) => {
    res.send("Hello")
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})