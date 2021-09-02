var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var freelanceJobsSchema = new mongoose.Schema({

Username : {
    type: String,
    required: true
},
Subject: {
    type: String,
    required: true
},
Description: {
    type: String,
    required: true
},
Budget: {
    type: String,
    required: true
    
},
Deadline: {
    type: String,
    required: true
},

Date: {
    type: Date,
    default: Date.now
}
});

var freelanceJobsModel = mongoose.model('freelancejobs', freelanceJobsSchema);
module.exports = freelanceJobsModel;