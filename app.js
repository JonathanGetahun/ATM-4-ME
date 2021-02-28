const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const mountRoutes = require('./routes');


app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/client/build')));

mountRoutes(app);


// send the user to index html page despite the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})