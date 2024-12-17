const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const detailscontact = new Schema ({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
});

const contact = mongoose.model('contact', detailscontact);
module.exports =  contact;