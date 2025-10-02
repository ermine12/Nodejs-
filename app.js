const express = require('express');

const connectionDB = require('./src/config');
const {validate} = require('./src/utiltys/validation')
const Model = require('./src/models/schema.js')
const bcrypt = require('bcrypt')
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const app = express();

const port = 3000;

app.use(express.json());
app.use(cookieparser());

app.post('/signup', async (req, res) => {
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


app.post('/login', async (req,res) => {

try{
 const {email, Password} = req.body;
 const user = await Model.findOne({email : email});
 if(!user){
  throw new Error("invalid Credintial")
 }
const valid_password = await bcrypt.compare(Password , user.Password)
if(valid_password){
//creating a token
const token = jwt.sign({_id : user._id}, "user_password")
//cookie
  res.cookie("token", token)

  res.send("login successfully")
}
else{
  throw new Error("invalid credintial")
}
}
catch(err){
  res.status(400).send("Error" + err.message)
}
})
app.get('/profile', async (req,res) => {
   
const cookie =   req.cookies
const {token} = cookie
const validate_token = await jwt.verify(token,'user_password')
const {_id} = validate_token
const find = await Model.findById(_id)


res.send(find)


})


app.get('/user', async (req,res) => {

  const find = req.body.Password
  try{
    const get_user = Model.find({Password : find})
    res.send(get_user)
  }
  catch(err){
    res.status(400).send('there is error fething your data')
  }
} )
















  connectionDB().then(() => {
          console.log("Database connected successfully");
    
    
    
          app.listen(port, () => {
        
            console.log(`Server is running on http://localhost:${port}`);
   
          });

        }).catch((err) => {
   
          console.log("Database connection failed", err);

        });
