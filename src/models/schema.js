const mongoose = require('mongoose');
const structure = mongoose.Schema({
    name : {
        type : String,
        minLength : 2,
        maxLength : 50,
        trim : true
    },
    last_name : {
        type : String,
        minLength : 2,
        maxLength : 50,
        trim : true
    },
    email : {
        type : String,
        trim : true,
        index : true,
        unique : true
    },
    Password : {
        type : String,
        required : true
        
    }, 
}, {timestamps : true });
module.exports = mongoose.model("User", structure)
