const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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
structure.methods.get_jwt = async function () {
    const user = this;
    const token =  await jwt.sign({_id : user._id}, "user_password")
    return token
}
structure.methods.validate_password = async function (password) {
    const user = this;
    const hash_password = user.Password
     const valid_password = await bcrypt.compare(password , hash_password)
     return valid_password
}
module.exports = mongoose.model("User", structure)
