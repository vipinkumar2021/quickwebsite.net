var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var feedbackSchema = new mongoose.Schema({

    Username: {
        type: String,    
    },
Feedback: {
    type: String,    
},
Suggestion: {
    type: String
},
Date: {
    type: Date,
    default: Date.now
}
});

var feedbackModel = mongoose.model('feedbacks', feedbackSchema);
module.exports = feedbackModel;