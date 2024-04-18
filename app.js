import express from 'express';
import { User, collection } from './mongo.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// POST route for user login
app.post("/login", async (req, res) => {
    let form_data = req.body;
    form_data = {
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date()
    };
    const userExists = await User.exists({ email: form_data.email });

    if (userExists) {
        return res.status(409).send("User with this email already exists.");
    }
    const user = new collection(form_data);
    try {
        await user.save();
        res.status(201).send('User saved successfully');
    } catch (error) {
        res.status(500).send('Error saving user: ' + error);
    }
});

// POST route for OAuth authentication
app.post("/oauth", async (req, res) => {
    const authData = {
        userID:req.body.userID,
        email: req.body.email,
        email_verified: req.body.email_verified,
        exp: req.body.exp,
        family_name: req.body.family_name,
        given_name: req.body.given_name,
        name: req.body.name,
        picture: req.body.picture,
        sub: req.body.sub,
        createdAt: new Date()
    };
    const userExists = await User.exists({ email: authData.email });

    if (userExists) {
        return res.status(409).send("User with this email already exists.");
    }

    const user = new User(authData);
    
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


