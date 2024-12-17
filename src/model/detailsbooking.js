const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const detailsbookingschema = new Schema ({
    day:{
        type: Date,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    }
    
});



module.exports =  mongoose.model('Booking', detailsbookingschema);
