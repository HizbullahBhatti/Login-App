const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./database/connection.js');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); //log the request to the console in a nice format for debugging purpose
app.disable('x-powered-by'); //security measure to hide the server type from the client side

const port = 8080;

//HTTP get Request
app.get('/',(req,res)=>{
    res.status(201).json("Home GET Request")
});

//Start the server when we have a valid connection to the database
connection().then(()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server is running on http://localhost:${port}`);
        }); 
    } catch (error) {
        console.log("Can't Conenct to Server")
    }
}).catch((err)=>{
    console.log("Invalid Connection to Database");
})
