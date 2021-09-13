var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var freelanceJobsCommentsSchema = new mongoose.Schema({

CommenterUsername: {
        type: String,
        required: true
},
Username : {
    type: String,
    required: true
},
FreelanceJobId: {
    type: String,
    required: true
},
CommentOnFreelanceJob: {
    type: String,
    required: true
},
RequestPayment: {
    type: String,
    
},

Date: {
    type: Date,
    default: Date.now
}
});

var freelanceJobsCommentsModel = mongoose.model('freelancejobscomments', freelanceJobsCommentsSchema);
module.exports = freelanceJobsCommentsModel;