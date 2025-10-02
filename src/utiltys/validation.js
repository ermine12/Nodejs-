const validator = require("validator");
const validate = (req) => {
    const {name , last_name, email, Password} = req.body;
    
    if(!name || !last_name ){
        throw new Error("YOU should insert both name and last_name")
    }
    if(!validator.isEmail(email)){
        throw new Error("The Email that you inserted is invalid")
    }
    if(!validator.isStrongPassword(Password)){
        throw new Error("The password shold be strong")
    }
    
   return true;
}
module.exports = { validate };