var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var orderSchema = new mongoose.Schema({

Firstname : {
    type: String,
    required: true
},
Lastname: {
    type: String,
    required: true
},
Mobilenumber : {
    type: String,
    required: true
},
Email: {
    type: String,
    required: true
    
},
HowCanWeHelpYou: {
    type: String,
    required: true
},
WebsiteDescription: {
    type: String,
    
},
WebsiteFeatures: {
    type: String,
    
},
Date: {
    type: Date,
    default: Date.now
}
});

var orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;