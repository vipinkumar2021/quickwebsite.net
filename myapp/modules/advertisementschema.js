var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var advertisementSchema = new mongoose.Schema({

    Username: {
        type: String,
        required: true
    },
    IndividualOrCompanyName: {
    type: String,
    required: true
},
ContactNumber: {
    type: String,
    required: true
},

Email: {
    type: String,
    required: true
    
},
Address: {
    type: String,
    required: true
},
Services: {
    type: String,
    required: true
},
Advertisement: {
    type: String,
    required: true
},

Date: {
    type: Date,
    default: Date.now
}
});

var advertisementModel = mongoose.model('advertisements', advertisementSchema);
module.exports = advertisementModel;