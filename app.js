import express from 'express';
import {User} from './mongo.js';
import cors from 'cors';
import { collection } from './mongo.js';
import bodyParser from 'body-parser';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/",async(req,res)=>{
    let form_data = req.body;
    form_data  = {
        email:req.body.email,
        password:req.body.password,
        createdAt: new Date()
    };
    const user = new collection(form_data);
    try {
        await user.save();
        res.status(201).send('User saved successfully');
    } catch (error) {
        res.status(500).send('Error saving user: ' + error);
    }

})





app.post("/", async (req, res) => {
    // Extract the authentication data from the request body
    const authData = {
        email: req.body.email,
        email_verified: req.body.email_verified,
        exp: req.body.exp,
        family_name: req.body.family_name,
        given_name: req.body.given_name,
        name: req.body.name,
        picture: req.body.picture,
        sub: req.body.sub,
        createdAt: new Date() // Set the createdAt to the current date and time
    };
    

    // Create a new user with the authentication data
    const user = new User(authData);

    // Save the user to the database
    try {
        await user.save();
        res.status(201).send('User saved successfully');
    } catch (error) {
        res.status(500).send('Error saving user: ' + error);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
