const express = require("express")

const validate = require("../src/utiltys/validation")
const Model = require("../src/models/schema")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")



const auth_router = express.Router();


auth_router.post('/signup', async (req, res) => {
 try { 
  
       
//validating the req.body
   validate(req);
   
const {name, last_name, email, Password} = req.body
//hashing the password
  const hashed = await bcrypt.hash(Password, 10);

// creating a model
  const user =   new Model({ name, last_name, email , Password : hashed})

//saving the user>
 
                 
    await user.save();
                
    res.send('User signed up successfully')} 
                               
    catch (err) {
       res.status(500).send("error happend signing you in becouse of " + err.message );

  }});


  
auth_router.post('/login', async (req,res) => {

try{
 const {email, Password} = req.body;
 const user = await Model.findOne({email : email});
 if(!user){
  throw new Error("invalid Credintjlksvial")
 }
const valid_password = await user.validate_password(Password)
if(valid_password){
//creating a token
const token =  await user.get_jwt()
  res.cookie("token", token)

  res.send("login successfully")
}
else{
  throw new Error("invalid cmd;lsadredintial")
}
}
catch(err){
  res.status(400).send("Error" + err.message)
}
})



module.exports = {auth_router};