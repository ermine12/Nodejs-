const express = require("express")
const { user_auth } = require('./src/middleware/auth.js');

const profile_router = express.Router();

profile_router.get("/profile" , user_auth, (req,res) => {
  const user = req.user
  res.send(user)
} )



module.exports = {profile_router};