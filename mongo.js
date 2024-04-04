const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://parthvijay418:g7guE2s6bjWffstb@form-data.xw9s7bb.mongodb.net/form-data")
.then(()=>{
    console.log("connected to database");
})
.catch(()=>{
    console.log("error connecting to database");
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

const collection = mongoose.model("Collection",formSchema);
module.exports = collection