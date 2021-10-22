var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
    useCreateIndex: true});

var conn = mongoose.Collection;

var referralCodeSchema = new mongoose.Schema({
    
    Username: {
        type: String,
        
    },
Firstname : {
    type: String,
    
},
Lastname: {
    type: String,
   
},

Mobilenumber : {
    type: String,
    
},
Email: {
    type: String,
    
},

ReferralCode: {
    type: String
  //  required: true    
},
RedeemStatus: {
    type: String
  //  required: true    
},
Date: {
    type: Date,
    default: Date.now
}
});

var referralCodeModel = mongoose.model('referralcodes', referralCodeSchema);
module.exports = referralCodeModel;