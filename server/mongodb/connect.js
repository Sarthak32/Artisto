import mongoose from 'mongoose';

const contnectdb = (url) =>{
    //for searching
    mongoose.set('strictQuery',true)
    //connecting to database
    mongoose.connect(url)
    .then(()=>console.log("connected to mongodb"))
    .catch((err)=> {
    console.error('failed to connect with mongo');
    console.error(err);})
}

export default contnectdb;
