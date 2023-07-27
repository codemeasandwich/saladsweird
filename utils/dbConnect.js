// utils/dbConnect.js

import mongoose from 'mongoose';

let connected;

function checkIfDBExists() {

    // Define your schema and model
    const Schema = mongoose.Schema;
    const TestModel = mongoose.model('TestModel', new Schema({ name: String }));

    // Check if the database is empty
    return TestModel.find((err, data) => {
        if (err) {
            throw err
        }
        return !!data.length
    }); // END TestModel.find
} // END checkIfDBExists

function dbConnect(populateDB) {
    if (connected) {
        return connected;
    }

    connected = mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(db => {
        return checkIfDBExists()
            .then(exists => {
                if (!exists) {
                    return populateDB()
                }
            }).then(() => db.connections[0])
    }) // END then
} // END dbConnect

export default dbConnect;
