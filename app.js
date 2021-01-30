const express = require('express');
const app = express();
const http = require('http');
require('dotenv').config();
const server = http.createServer(app);


app.get('/', (req,res) => {
    res.send("Hello")
});

const port = process.env.PORT
app.listen(4000, () => {
    console.log(`Server listening on port ${port}`);
})