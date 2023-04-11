import {mongoose} from 'mongoose';
import mongodbMemoryServer from 'mongodb-memory-server';
import ENV from '../config.js';
//This is a package that allows us to create a mock database in memory for testing purposes

const Connect = async() => {
    //const mongod = await mongodbMemoryServer.MongoMemoryServer.create();
    //const getURI = mongod.getUri();
    const uri = ENV.ATLAS_URI;


    mongoose.set('strictQuery', true);
    console.log('waiting for connection')
    const db = mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log('Connection Successful');
    })
    .catch((err)=>{
        console.log('Connection Failed',err);
    })
    
    //const db = await mongoose.connect(uri);
    return db;
}

export default Connect;