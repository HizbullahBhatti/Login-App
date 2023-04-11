import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Connect from './database/connection.js';
import router from './router/route.js';
import bodyParser from 'body-parser';

const app = express();

//Middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(morgan('tiny')); //log the request to the console in a nice format for debugging purpose
app.disable('x-powered-by'); //security measure to hide the server type from the client side
app.use(bodyParser.json({ limit: '10mb' })); //limit the size of the request body
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); //

const port = process.env.PORT || 5000;

//HTTP get Request
app.get('/',(req,res)=>{
    res.status(201).json("Home GET Request")
});

//API Routes
app.use('/api',router);

//Start the server when we have a valid connection to the database
Connect().then(()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server is running on http://localhost:${port}`);
        }); 
    } catch (error) {
        console.log("Can't Conenct to Server")
    }
}).catch((err)=>{
    console.log(err);
})
