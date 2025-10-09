const Model = require("../models/schema")
const jwt = require("jsonwebtoken")

const user_auth = async (req,res,next) => {
 try{
     const cookie = req.cookies
     const {token} = cookie
     if(!token) {
         throw new Error("invalid token")
     }
     const token_verify = jwt.verify(token,"user_password")
     const {_id} = token_verify;
     if(!_id){
         throw new Error("user not found")
     }
     const user = await Model.findById(_id);
  req.user =  user
  next();
 }
 catch(err){
     res.status(400).send("ERROR:" + err.message)
 }
}
module.exports = {user_auth}