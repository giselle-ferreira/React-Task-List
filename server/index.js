require('./db')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

const express = require('express');
const connectToDB = require('./db/index')
const port = process.env.PORT || 3001;

const app = express();

const cors = require('cors');

connectToDB();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const routes = require('./routes');
app.use(routes)

// Listen port
app.listen(port, () => console.log(`Listening on PORT ${port}.`))

