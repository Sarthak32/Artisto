import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import contnectdb from './mongodb/connect.js';
import postRoutes from './Routes/postRoutes.js';
import  replicateRoutes from './Routes/Stablediffussion.js';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/replicate',replicateRoutes)
app.use('/post', postRoutes)

app.get('/' , async(req,res) => {res.send('Welcome to Artisto')})

const mongodb_url="mongodb+srv://dbuser:dbuserpass@cluster0.omofxgq.mongodb.net/?retryWrites=true&w=majority"; 

const startServer = async() => {
    try{
        contnectdb(mongodb_url);
        app.listen(8080, ()=>{
            console.log("server has started on port : http://localhost:8080")
        })

    }catch(error){
        console.log(error)
    }
}
startServer();