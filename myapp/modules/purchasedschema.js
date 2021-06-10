var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var purchasedSchema = new mongoose.Schema({

Username: {
    type:String
},
CustomerId: {
    type: String
},
ClientReferenceId: {
    type: String
},

Purchased: {
    type: String
},
TotalCost: {
    type: String
},

Date: {
    type: Date,
    default: Date.now
}
});

var purchasedModel = mongoose.model('purchaseds', purchasedSchema);
module.exports = purchasedModel;
