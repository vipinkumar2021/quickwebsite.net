var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var invoicesListSchema = new mongoose.Schema({

BrandName: {
    type:String
},
Username: {
    type:String
},
OrderId: {
    type: String
},
PaymentReference: {
    type: String
},
OrderCompletionDays: {
    type: String
},
OrderCompletionDays: {
    type: String
},
OrderCompletionDays: {
    type: String
},

Date: {
    type: Date,
    default: Date.now
}
});

var cartItemsModel = mongoose.model('cartitems', cartItemsSchema);
module.exports = cartItemsModel;
