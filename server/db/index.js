const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect( process.env.DB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true // for legacy
    })

    // connection info
    const db = mongoose.connection ;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log('Connected to the database'))

};

module.exports = connectToDB;



