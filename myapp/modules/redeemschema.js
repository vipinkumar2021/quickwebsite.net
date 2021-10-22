var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
    useCreateIndex: true});

var conn = mongoose.Collection;

var redeemSchema = new mongoose.Schema({

    Username : {
        type: String,
        
    },
ReferralCode : {
    type: String,
    
},
BankAccount: {
    type: String,
    
},
Ifsc: {
    type: String,
    
},
BankName : {
    type: String,
    
},
BankBranch : {
    type: String,
    
},

Date: {
    type: Date,
    default: Date.now
}
});

var redeemModel = mongoose.model('redeems', redeemSchema);
module.exports = redeemModel;