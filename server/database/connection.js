import {mongoose} from 'mongoose';
import mongodbMemoryServer from 'mongodb-memory-server';
//This is a package that allows us to create a mock database in memory for testing purposes

const Connect = async () => {
    const mongod = await mongodbMemoryServer.MongoMemoryServer.create();
    const getURI = mongod.getUri();

    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(getURI);
    console.log('Connected to the database');
    return db;
}

export default Connect;