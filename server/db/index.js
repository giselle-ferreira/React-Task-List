const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

function connectToDB() {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true // for legacy
    })
 
    // connection info
    const db = mongoose.connection ;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log('Connected to the database'))

};

module.exports = connectToDB;



