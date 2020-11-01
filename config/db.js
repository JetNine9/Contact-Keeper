// We are gonna use mongoose to connect to our database in this file
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI") // This grabs the value within default.json that is titled MongoURI. Basically grabbing the database.

const connectDb = async () => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        })

        console.log("Mongo DB connected AKA we connected to the database")

    } catch (error) {
        console.log("this is your error! ", + error)
        process.exit();

    }
}

module.exports = connectDb;
