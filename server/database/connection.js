const mongoose = require('mongoose');
const mongodbMemoryServer = require('mongodb-memory-server'); 
//This is a package that allows us to create a mock database in memory for testing purposes

const connect = async () => {
    const mongod = await mongodbMemoryServer.create();
    const getURI = mongod.getURI();

    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(getURI);
    console.log('Connected to the database');
    return db;
}

module.exports = connect;