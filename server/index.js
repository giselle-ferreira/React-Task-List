require('./db')
require('dotenv/config');

const express = require('express');
const connectToDB = require('./db/index')
const port = 3001;
const path = require('path')

const app = express();


const cors = require('cors');

connectToDB();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(express.static(path.join(__dirname + '/public')))

const routes = require('./routes');
app.use(routes)

// Listen port
app.listen(port, () => console.log(`Listening on PORT ${port}.`))

