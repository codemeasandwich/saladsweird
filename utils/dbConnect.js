import importOldCsvs from './importOldCsvs';
import models from '../models';

import mongoose from 'mongoose';

let connected;

function checkIfDBExists() {

    // Check if the database is empty
    return models.Location.find({})
        .then(locations => {
            console.log("locations", locations)
            if (locations.length) {
                return true
            }
            return false
        }) // END Location.find
} // END checkIfDBExists

function dbConnect(populateDB) {
    if (connected) {
        return connected;
    }

    connected = mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(db => {
        return checkIfDBExists()
            .then(exists => {
                console.log("exists", exists)
                if (!!exists) {
                    return "function" === typeof populateDB ? populateDB() : importOldCsvs()
                }
            }).then(() => db.connections[0])
    }) // END then
    return connected;
} // END dbConnect

export default dbConnect;
