// const mongoose = require('mongoose');
import  mongoose  from "mongoose";
mongoose.connect("mongodb+srv://parthvijay418:g7guE2s6bjWffstb@form-data.xw9s7bb.mongodb.net/form-data")
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log("error connecting to database"+err);
})

const formSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true   
    }
})
const Schema = mongoose.Schema;
const UserSchema = new Schema({

    email: {
      type: String,
      required: true,
      unique: true
    },
    email_verified: {
      type: Boolean,
      required: true
    },
    exp: {
      type: Number,
      required: true
    },
    family_name: {
      type: String,
      required: true
    },
    given_name: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      default: ''
    },
    sub: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

// In your mongoose model file
export const User = mongoose.model('User', UserSchema);


export const collection = mongoose.model("Collection", formSchema);
