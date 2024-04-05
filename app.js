// import collection from '../mongo';
const express = require('express');
const collection = require('./mongo');
const UserSchema  = require('./mongo')

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
app.post("/",async (req,res) => {
    const{email,name,avatar}  = req.body;
    const data = {
        email:email,
        name:name,
        avatar:avatar   
    }
    await UserSchema.insertMany([data]);
})



app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

