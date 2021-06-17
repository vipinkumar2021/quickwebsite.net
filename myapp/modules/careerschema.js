var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var careerSchema = new mongoose.Schema({

Firstname: {
    type: String,
    //required: true
},
Lastname: {
    type: String,
    //required: true
},

Email: {
    type: String,
   // required: true,
   /* index: {
            unique: true
        } */
},
Mobilenumber : {
    type: String,
    //required: true,
   /* index: {
        unique: true
    } */
},
Gender: {
    type: String,
    
},
Address: {
    type: String,
    
},
NationalIdNumber: {
    type: String,
    /*required: true,
    index: {
        unique: true
    } */
},
NationIdImageName: {
    type: String 

},
CVfilename: {
    type: String
    // required: true
},
BriefDescription: {
    type: String
  //  required: true    
}, 
Date: {
    type: Date,
    default: Date.now
}
});

var careerModel = mongoose.model('careerapplications', careerSchema);
module.exports = careerModel;
