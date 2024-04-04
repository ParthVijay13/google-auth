// import collection from '../mongo';
const express = require('express');
const collection = require('./mongo');
// const collection = express('./mongo.js');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());



app.post("/",async (req,res) => {
    const{email,password}  = req.body;
    const data = {
        email:email,
        password:password,
        
    }
    await collection.insertMany([data]);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

