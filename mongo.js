const mongoose = require('mongoose');
console.log("before Runnig the line to coneect to the database");
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

// const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
//   password: {
//     type: String,
//     required: false
//   }
});

module.exports = mongoose.model('User', UserSchema);